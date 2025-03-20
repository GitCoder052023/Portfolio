const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

const app = express();
const port = process.env.FPORT;

app.use('/Templates/*', (req, res) => {
    res.status(403).sendFile(path.join(__dirname, '../Public/Templates/Access_Denied.html'));
});

app.use(express.static(path.join(__dirname, '../Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Templates/index.html'));
});

app.get("/contact-request-accepted", (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Templates/ContactRequest_accepted.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Templates/admin.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../Public/Templates/404.html'));
});

app.listen(port, () => {
    console.log(`Client is running on port ${port}`);
});