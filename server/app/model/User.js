const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
    //  Define model
    const User = sequelize.define('user', {
        f_name: {
            type: Sequelize.STRING
        },
        l_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        rut: {
            type: Sequelize.INTEGER
        },
        dv: {
            type: Sequelize.STRING
        },
        rutdv: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        series: {
            type: Sequelize.STRING
        },
        f_name: {
            type: Sequelize.STRING
        },
        l_name: {
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
    }, {
        // Enable Underscore
        underscored: true,
        sequelize,
        modelName: 'user'
    });

    return User;
}