const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/profile-image', async (req, res) => {
    try {
        const publicId = 'profile_images/profile';
        
        try {
            const result = await cloudinary.api.resource(publicId);
            
            const timestamp = new Date().getTime();
            
            res.set({
                'Cache-Control': 'no-store, no-cache, must-revalidate, private',
                'Expires': '0',
                'Pragma': 'no-cache',
                'X-Content-Type-Options': 'nosniff',
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS,
                'Access-Control-Allow-Methods': 'GET',
                'Cross-Origin-Resource-Policy': 'cross-origin',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
            });
            
            return res.redirect(`${result.secure_url}?t=${timestamp}`);
        } catch (error) {
            console.error('Cloudinary resource not found:', error);
            res.status(404).json({ message: 'Profile image not found' });
        }
    } catch (error) {
        console.error('Error serving profile image:', error);
        res.status(500).json({ message: 'Error serving image' });
    }
});

module.exports = router;