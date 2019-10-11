const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
var jwt = require('jsonwebtoken');


// User Info
exports.userinfo = (req, res) => {
    User.findAll()
        .then(user => {
            // console.log(user);
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        });
}

// User Info by p_code
exports.oneuserinfo = (req, res) => {
    User.findOne({
        where : {
            p_code : req.params.p_code
        }
    })
        .then(user => {
            // console.log(user);
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        });
}

// User signup
exports.signup = (req, res) => {
    User.create({
        f_name : req.body.f_name, 
        l_name : req.body.l_name, 
        email : req.body.email, 
        p_code : req.body.p_code, 
        rut : req.body.rut, 
        series : req.body.series, 
        phone : req.body.phone, 
        m_l_name : req.body.m_l_name, 
        b_date : req.body.b_date, 
        key : req.body.key
    }).then(user => {
        var token = jwt.sign({p_code: user.p_code}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            auth: true,
            accessToken: token,
            // p_code: user.p_code
        });
    })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        })
}