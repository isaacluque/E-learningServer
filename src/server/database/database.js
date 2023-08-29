const { Sequelize } = require('sequelize');

const { SCHEMA,
        MYSQL_HOST,
        SQL_USER,
        SQL_PASSWORD, } = process.env

// Option 3: Passing parameters separately (other dialects)
const connec = new Sequelize(SCHEMA, SQL_USER, SQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});

module.exports = {
    connec
};