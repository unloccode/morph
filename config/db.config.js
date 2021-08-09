const config = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USERNAME,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//require model
db.user = require('../models/user.models')(sequelize, Sequelize);

module.exports = db;