const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const PurchaseCode = db.purchase_code;
var jwt = require('jsonwebtoken');


checkUserAlreadyExist = (req, res, next) => {
    // Check for RUT
    User.findOne({
        where : {
            rut : req.body.rut
        }
    }).then(user => {
            if(user){
                if((user.series === req.body.series) && (user.email === req.body.email)){

                    User.update(
                        {
                            f_name : req.body.f_name, 
                            l_name : req.body.l_name, 
                            email : req.body.email, 
                            rut : req.body.rut, 
                            dv : req.body.dv, 
                            series : req.body.series, 
                            m_l_name : req.body.m_l_name, 
                            b_date : req.body.b_date, 
                        },
                        { where: { rut : req.body.rut }
                    }).then(user => {
                        PurchaseCode.update(
                            { userRut : req.body.rut },
                            { where: { p_code : res.locals.p_code } 
                        })
                        .then(p_code => {
                            res.status(200).send({success : 'Actualizado exitosamente'});
                        }).catch(err => {
                            res.status(500).send({ reason: err.message });
                        });
                    }).catch(err => {
                        res.status(500).send({ reason: err.message });
                    });
                    return true;
                }

                var token = jwt.sign({p_code: user.p_code}, config.secret, {
                expiresIn: 86400 // 24 hours
                });

                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    message: 'RUT already exist',
                });
            }

            // Check for series
            User.findOne({
                where : {
                    series : req.body.series
                }
            }).then(user => {
                if(user){
                    var token = jwt.sign({p_code: user.p_code}, config.secret, {
                    expiresIn: 86400 // 24 hours
                    });
    
                    res.status(200).send({
                        auth: true,
                        accessToken: token,
                        message: 'series already exist',
                    });
                }
            })
            
            // Check for email
            User.findOne({
                where : {
                    email : req.body.email
                }
            }).then(user => {
                if(user){
                    var token = jwt.sign({p_code: user.p_code}, config.secret, {
                    expiresIn: 86400 // 24 hours
                    });
    
                    return res.status(200).send({
                        auth: true,
                        accessToken: token,
                        message: 'Email already exist',
                    });
                   
                }else{
                    next();
                }
            }).catch(err => {
                res.status(500).send(err);
            });
    }).catch(err => {
        res.status(500).send(err);
    });
}

checkPurchaseCodeAlreadyExist = (req, res, next) => {
    // Check Purchase code already exist
    PurchaseCode.findOne({
        where : {
            p_code : req.body.p_code
        },
        include:[{
            model:User,
            // attributes: {
            // exclude: ['key']
            // }
        }]
    }).then(user => {
            if(user){
                if(user.userRut) {
                    var token = jwt.sign({p_code: user.p_code}, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
    
                    res.status(200).send({
                        auth: true,
                        accessToken: token,
                        message: 'User alredy registered',
                        id: user.userId,
                        userInfo:user.user
                    });
                }else{
                    var token = jwt.sign({p_code: user.p_code}, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
    
                    res.status(200).send({
                        auth: true,
                        accessToken: token,
                        message:'Purchase code alredy registered',
                    });
                }
                
                return true;
            }

            next();
    }).catch(err => {
        res.status(500).send(err);
    });
}


const verifyUser = {};
verifyUser.checkUserAlreadyExist = checkUserAlreadyExist;
verifyUser.checkPurchaseCodeAlreadyExist = checkPurchaseCodeAlreadyExist;
module.exports = verifyUser;
