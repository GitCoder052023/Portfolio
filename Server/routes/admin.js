const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs/promises');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG allowed.'));
        }
    }
});

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
        console.log('Login attempt:', { username }); 
        
        if (username !== process.env.ADMIN_USERNAME) {
            console.log('Username mismatch'); 
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
        console.log('Password match:', passwordMatch); 

        if (!passwordMatch) {
            console.log('Password mismatch'); 
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: process.env.ADMIN_USERNAME },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login successful'); 
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/admin/update-profile-image', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const imagePath = path.join(__dirname, '../assets/images/profile.jpg');
        
        try {
            await fs.copyFile(imagePath, imagePath + '.backup');
        } catch (error) {
            console.log('No existing image to backup');
        }

        await fs.writeFile(imagePath, req.file.buffer);

        res.json({ message: 'Profile image updated successfully' });
    } catch (error) {
        console.error('Image upload error:', error);
        
        try {
            await fs.copyFile(imagePath + '.backup', imagePath);
        } catch (error) {
            console.log('No backup to restore');
        }

        res.status(500).json({ message: 'Failed to update profile image' });
    }
});

module.exports = router;