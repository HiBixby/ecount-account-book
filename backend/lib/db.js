const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'household_db',
});

connection.connect(error => {
  if (error) {
    throw error;
  }

  console.log('MySQL connected');
});

module.exports = connection;
