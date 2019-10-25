const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const PurchaseCode = db.purchase_code;
var jwt = require('jsonwebtoken');



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
                rut: PurchaseCode.userRut
            }
        }).then(user => {
            if (user) {
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
    User.create({
        f_name : req.body.f_name, 
        l_name : req.body.l_name, 
        email : req.body.email, 
        rut : req.body.rut, 
        dv : req.body.dv, 
        series : req.body.series, 
        m_l_name : req.body.m_l_name, 
        b_date : req.body.b_date, 
    }).then(user => {
        PurchaseCode.update(
            {
                userRut: user.rut
            },
            {
                where: {p_code : res.locals.p_code}
            }
        ).then(PurchaseCode => {
            res.status(200).send({success:'Registrado correctamente'})
        }).catch(err => {
            res.status(500).send({ reason: err.message });
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
}

// User update
exports.update = (req, res) => {
    // res.send({'p_code':res.locals.p_code})
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
            {
                userRut: user.rut
            },
            {
                where: {p_code : res.locals.p_code}
            }
        ).then(PurchaseCode => {
            res.status(200).send({success:'perfil actualizado con éxito'})
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
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    })
}