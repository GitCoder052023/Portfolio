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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});