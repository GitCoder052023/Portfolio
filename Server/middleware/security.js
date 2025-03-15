const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many API requests from this IP, please try again later'
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: 'Too many contact form submissions, please try again later'
});

const securityMiddleware = [
    helmet(), 
    xss(), 
    hpp(), 
];

module.exports = {
    limiter,
    apiLimiter,
    contactLimiter,
    securityMiddleware
};