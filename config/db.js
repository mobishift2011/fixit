require('./index');
const { env } = process;

module.exports = {
  "development": {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_NAME,
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "dialect": "mysql",
    // "dialectOptions": {
    //   "useUTC": false //for reading from database
    // },
    "timezone": '+08:00', //for writing to database
    "operatorsAliases": false
  },
  "test": {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_NAME,
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "dialect": "mysql",
    // "dialectOptions": {
    //   "useUTC": false //for reading from database
    // },
    "timezone": '+08:00', //for writing to database
    "operatorsAliases": false
  },
  "production": {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_NAME,
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "dialect": "mysql",
    // "dialectOptions": {
    //   "useUTC": false //for reading from database
    // },
    "timezone": '+08:00', //for writing to database
    "operatorsAliases": false
  }
}
