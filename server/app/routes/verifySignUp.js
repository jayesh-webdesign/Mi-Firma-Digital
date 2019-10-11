const db = require('../config/db.config');
const User  = db.user;

checkAlreadyExist = (req, res, next) => {
    // Check Purchase code already exist
    User.findOne({
        where : {
            p_code : req.body.p_code
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: 'Purchase code alredy registered',
                p_code: user.p_code
            });
            return;
        }

        next();
    })
}


const signUpVerify = {};
signUpVerify.checkAlreadyExist = checkAlreadyExist;
module.exports = signUpVerify;
