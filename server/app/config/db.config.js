const env = require('./env');
var Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    // operatorsAliases: false,

    // Disable logging; default: console.log
    // logging: false,

    pool:{
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/User')(sequelize, Sequelize);
db.purchase_code = require('../model/PurchaseCode')(sequelize, Sequelize);

db.user.hasMany(db.purchase_code); // Will add userId to PurchaseCode model
db.purchase_code.belongsTo(db.user); // Will also add userId to PurchaseCode model



// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
  // sync({force: true}) will drop the table if it already exists
  db.sequelize.sync().then(()=>{
    console.log('Table will be created if not found');
  });

  module.exports = db;