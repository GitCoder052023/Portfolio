const express = require('express');
const path = require('path');

const app = express();
const port = process.env.FPORT;

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