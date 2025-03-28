const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoute = require('./routes/contact');
const downloadRoute = require('./routes/download');
const imagesRoute = require('./routes/images');
const adminRoute = require('./routes/admin');
const path = require('path');
const { limiter, apiLimiter, contactLimiter, securityMiddleware } = require('./middleware/security');
const ddosProtection = require('./middleware/ddosProtection');
const transporter = require('./config');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

const app = express();
const port = process.env.PORT;

app.use(ddosProtection);
app.use(limiter);
app.use(securityMiddleware);
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, '../Public'), {
    setHeaders: (res, path) => {
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('X-Frame-Options', 'DENY');
    }
}));

const allowedOrigins = [
    `http://${process.env.ALLOWED_ORIGINS}`
];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    secure: true
};

app.use(cors(corsOptions));
app.use('/api', apiLimiter);
app.use('/api/contact', contactLimiter);
app.use('/api', contactRoute);
app.use('/api', downloadRoute);
app.use('/api', imagesRoute);
app.use('/api', adminRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Not found'
    });
});

app.post("/send-email", async (req, res) => {
    const { amount, upiId, senderName } = req.body;

    if (!amount) {
        return res.status(400).json({ success: false, message: "Amount is required" });
    }

    try {
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
        
        res.json({ success: true, message: "Email notification sent!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, message: "Email failed to send." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});