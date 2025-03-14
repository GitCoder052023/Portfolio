const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/profile-image', (req, res) => {
    try {
        const imagePath = path.join(__dirname, '../assets/images/profile.jpg');
        
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            'Expires': '0',
            'Pragma': 'no-cache',
            'X-Content-Type-Options': 'nosniff'
        });
        
        res.sendFile(imagePath);
    } catch (error) {
        console.error('Error serving profile image:', error);
        res.status(500).json({ message: 'Error serving image' });
    }
});

module.exports = router;