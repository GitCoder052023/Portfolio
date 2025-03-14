const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contactRoute = require('./routes/contact');
const downloadRoute = require('./routes/download')
const imagesRoute = require('./routes/images');
const path = require('path');
const app = express();
const port = process.env.PORT
const host = process.env.HOST

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Public')));

const allowedOrigins = [
    'http://localhost:3000',
    `http://${host}:3000`
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.options('*', cors());

app.use('/api', contactRoute);
app.use('/api', downloadRoute);
app.use('/api', imagesRoute);

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});