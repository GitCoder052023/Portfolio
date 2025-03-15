const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contactRoute = require('./routes/contact');
const downloadRoute = require('./routes/download')
const imagesRoute = require('./routes/images');
const path = require('path');
const { limiter, apiLimiter, contactLimiter, securityMiddleware } = require('./middleware/security');
const ddosProtection = require('./middleware/ddosProtection');
const app = express();
const port = process.env.PORT
const host = process.env.HOST

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
    'http://localhost:3000',
    `http://${host}:3000`
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ['Content-Type', 'Content-Length']
};

app.use(cors(corsOptions));

app.use('/api', apiLimiter);
app.use('/api/contact', contactLimiter);

app.use('/api', contactRoute);
app.use('/api', downloadRoute);
app.use('/api', imagesRoute);

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
    console.log(`Server is running on http://${host}:${port}`);
});