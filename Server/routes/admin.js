require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG allowed.'));
        }
    }
}).single('image'); 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (username !== process.env.ADMIN_USERNAME) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: process.env.ADMIN_USERNAME },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/admin/update-profile-image', authenticateToken, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No image provided' });
            }

            if (process.env.NODE_ENV === 'production') {
                const uploadPromise = new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'profile_images', public_id: 'profile', overwrite: true },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
                });

                const result = await uploadPromise;
                return res.json({ message: 'Profile image updated successfully', imageUrl: result.secure_url });
            } else {
                const imagePath = path.join(__dirname, '../assets/images/profile.jpg');

                try {
                    await fs.copyFile(imagePath, imagePath + '.backup');
                } catch (error) {
                    console.log('No existing image to backup');
                }

                await fs.writeFile(imagePath, req.file.buffer);
                return res.json({ message: 'Profile image updated successfully' });
            }
        } catch (error) {
            console.error('Image upload error:', error);

            if (process.env.NODE_ENV !== 'production') {
                const imagePath = path.join(__dirname, '../assets/images/profile.jpg');
                try {
                    await fs.copyFile(imagePath + '.backup', imagePath);
                } catch (error) {
                    console.log('No backup to restore');
                }
            }

            return res.status(500).json({ message: 'Failed to update profile image' });
        }
    });
});

module.exports = router;