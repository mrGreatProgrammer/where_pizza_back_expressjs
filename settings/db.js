const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('where_pizza', 'root', 'goodfine', {
  host: 'localhost',
  dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  port: 3306
});

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize;