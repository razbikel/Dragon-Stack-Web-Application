const {Pool} = require('pg')
const databaseConfiguration = require('./secrets/databaseConfiguration')

// for interacting with postgresSQL DB
const pool = new Pool(databaseConfiguration);

module.exports = pool;
