const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
    // Use JawsDB MySQL database on Heroku
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
        dialect: 'mysql',
    });
} else {
    // Use local MySQL database for development
    sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    });
}

module.exports = sequelize;
