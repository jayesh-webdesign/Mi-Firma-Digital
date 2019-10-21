const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const PurchaseCode = db.purchase_code;
var jwt = require('jsonwebtoken');
var crypto = require('crypto');



// User Info by p_code
exports.oneuserinfo = (req, res) => {
    // res.send({'p_code': res.locals.p_code})
    PurchaseCode.findOne({
        where: {
            p_code: res.locals.p_code
        }
    }).then( PurchaseCode => {
        User.findOne({
            where: {
                rut: PurchaseCode.userRutdv
            }
        }).then(user => {
            if (user) {
                // Decrypt to the Key
                var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
                var key = mykey.update(user.key, 'hex', 'utf8')
                key += mykey.final('utf8');
                user.key = key;
                res.status(200).send(user);
            }
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send({ reason: err.message });
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });    
}

// User signup
exports.signup = (req, res) => {
    // Encrypt the Key
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var keyHex = mykey.update(req.body.key, 'utf8', 'hex')
    keyHex += mykey.final('hex');

    User.create({
        f_name : req.body.f_name, 
        l_name : req.body.l_name, 
        email : req.body.email, 
        rut : req.body.rut, 
        dv : req.body.dv, 
        rutdv : req.body.rut + req.body.dv, 
        series : req.body.series, 
        m_l_name : req.body.m_l_name, 
        b_date : req.body.b_date, 
        key : keyHex
    }).then(user => {
        PurchaseCode.update(
            {
                userRutdv: user.rutdv
            },
            {
                where: {p_code : res.locals.p_code}
            }
        ).then(PurchaseCode => {
            res.status(200).send({success:'User registered successfully'})
        }).catch(err => {
            res.status(500).send({ reason: err.message });
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
}

// User update
exports.update = (req, res) => {
    // Encrypt the Key
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var keyHex = mykey.update(req.body.key, 'utf8', 'hex')
    keyHex += mykey.final('hex');
    
    // res.send({'p_code':res.locals.p_code})
    User.update(
        {
            f_name : req.body.f_name, 
            l_name : req.body.l_name, 
            email : req.body.email, 
            rut : req.body.rut, 
            dv : req.body.dv, 
            rutdv : req.body.rut + req.body.dv, 
            series : req.body.series, 
            m_l_name : req.body.m_l_name, 
            b_date : req.body.b_date, 
            key : keyHex
        },
        { where: { rutdv : req.body.rut + req.body.dv }
    }).then(user => {
        PurchaseCode.update(
            {
                userRutdv: user.rutdv
            },
            {
                where: {p_code : res.locals.p_code}
            }
        ).then(PurchaseCode => {
            res.status(200).send({success:'User updated successfully'})
        }).catch(err => {
            res.status(500).send({ reason: err.message });
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
}

// Add Purchase code
exports.addpurchasecode = (req, res) => {
    PurchaseCode.create({
        p_code : req.body.p_code
    }).then(user => {
        var token = jwt.sign({p_code: user.p_code}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            auth: true,
            accessToken: token,
            // p_code: user.p_code
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    })
}