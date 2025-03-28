const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { amount, upiId, senderName } = req.body;

    if (!amount) {
        return res.status(400).json({ success: false, message: "Amount is required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `Eidi Collection <${process.env.EMAIL_USER}>`,
            to: "hamdankhubaib959@gmail.com",
            subject: "New Eidi Received! 🎁",
            text: `You received ₹${amount} from ${senderName || 'Anonymous'} (${upiId}).`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h1>New Eidi Received! 🎁</h1>
                    <p>You received <strong>₹${amount}</strong> from ${senderName || 'Anonymous'} (${upiId}).</p>
                    <p>Transaction Details:</p>
                    <ul>
                        <li>Amount: ₹${amount}</li>
                        <li>Sender: ${senderName || 'Anonymous'}</li>
                        <li>UPI ID: ${upiId}</li>
                        <li>Time: ${new Date().toLocaleString('en-IN')}</li>
                    </ul>
                    <p>Eid Mubarak! 🌙</p>
                </div>
            `
        });
        
        res.status(200).json({ success: true, message: "Email notification sent!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, message: "Email failed to send: " + error.message });
    }
}