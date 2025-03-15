const Ddos = require('ddos');

const ddosConfig = {
    burst: 10, 
    limit: 15, 
    maxexpiry: 120, 
    checkinterval: 5, 
    trustProxy: true, 
    includeUserAgent: true, 
    whitelist: [], 
    errormessage: 'Access denied', 
    responseStatus: 429 
};

const ddos = new Ddos(ddosConfig);

module.exports = ddos.express;