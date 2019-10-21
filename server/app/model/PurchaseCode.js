const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
    //  Define model
    const PurchaseCode = sequelize.define('purchase_code', {
        p_code: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // Enable Underscore
        underscored: true,
        sequelize,
        modelName: 'purchase_code'
    });

    return PurchaseCode;
}