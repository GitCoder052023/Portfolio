const express = require('express');
const router = express.Router();
const transporter = require('../config');

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Hello ${name}!</h2>
                    <p>Thank you for getting in touch. I've received your message and will get back to you as soon as possible.</p>
                    <p>Here's a copy of your message:</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </div>
                    <p>Best regards,<br>Hamdan Khubaib</p>
                </div>
            `
        };

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'hamdankhubaib959@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Contact Form Submission</h2>
                    <p>You have received a new message from your portfolio website.</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </div>
                </div>
            `
        };

        await Promise.all([
            transporter.sendMail(userMailOptions),
            transporter.sendMail(adminMailOptions)
        ]);

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: 'Error sending emails' });
    }
});

module.exports = router;