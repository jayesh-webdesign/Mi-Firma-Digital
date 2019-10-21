const config = require('../config/config');
var jwt = require('jsonwebtoken');

isTokenValid = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, config.secret)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    var purchaseCode = payload.p_code;
    res.locals.p_code = purchaseCode;
    next();
}



verifyToken = {}
verifyToken.isTokenValid = isTokenValid;
module.exports = verifyToken;