const Sequelize = require('sequelize');
const db = {};
const path = require('path');
const storage = path.join(__dirname, 'db.sqlite3');

console.log('STORAGE: ', storage)

const sequelize = new Sequelize(storage, '', '', {
    dialect: 'sqlite',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000    
    },
    storage
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;