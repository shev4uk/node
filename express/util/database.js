const sql = require('mssql');

const config = {
  server: 'localhost',
  user: 'user',
  database: 'blog',
  password: 'Qw12345678'
}

const pool = new sql.ConnectionPool(config);

pool.on('error', err => {
  console.log('er', err);
})

module.exports = pool.connect();