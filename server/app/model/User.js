const Sequelize = require('sequelize');
const db = require('../config/db.config');

module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('users', {
        f_name: {
            type: Sequelize.STRING
        },
        l_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        p_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rut: {
            type: Sequelize.STRING
        },
        series: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        series: {
            type: Sequelize.STRING
        },
        m_l_name: {
            type: Sequelize.STRING
        },
        b_date: {
            type: Sequelize.DATEONLY
        },
        key: {
            type: Sequelize.STRING
        },
    });

    return User;
}


// const  User = sequelize.define('user', {
//             f_name: {
//                 type: Sequelize.STRING
//             },
//             l_name: {
//                 type: Sequelize.STRING
//             },
//             email: {
//                 type: Sequelize.STRING
//             },
//             p_code: {
//                 type: Sequelize.STRING,
//                 notNull: true
//             },
//             rut: {
//                 type: Sequelize.STRING
//             },
//             series: {
//                 type: Sequelize.STRING
//             },
//             m_l_name: {
//                 type: Sequelize.STRING
//             },
//             b_date: {
//                 type: Sequelize.DATEONLY
//             },
//             key: {
//                 type: Sequelize.STRING
//             },
// });

// module.exports = User;