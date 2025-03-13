const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/download-cv', (req, res) => {
    try {
        // Store CV in a non-public directory
        const cvPath = path.join(__dirname, '../assets/CV.pdf');
        
        res.download(cvPath, 'Hamdan_Khubaib_CV.pdf', (err) => {
            if (err) {
                console.error('Error downloading CV:', err);
                res.status(500).json({ message: 'Error downloading CV' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;