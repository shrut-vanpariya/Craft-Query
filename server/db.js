const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'chatbot',
});
module.exports = pool;
