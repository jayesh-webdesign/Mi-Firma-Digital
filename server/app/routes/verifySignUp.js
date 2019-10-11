const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
var jwt = require('jsonwebtoken');

checkAlreadyExist = (req, res, next) => {
    // Check Purchase code already exist
    User.findOne({
        where : {
            p_code : req.body.p_code
        }
    }).then(user => {
            if(user){
                var token = jwt.sign({p_code: user.p_code}, config.secret, {
                expiresIn: 86400 // 24 hours
                });

                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    message: 'Purchase code alredy registered',
                    // p_code: user.p_code
                });
                return true;
            }

            next();
    }).catch(err => {
        res.status(500).send(err);
    });
}


const signUpVerify = {};
signUpVerify.checkAlreadyExist = checkAlreadyExist;
module.exports = signUpVerify;
