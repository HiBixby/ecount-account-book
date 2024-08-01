const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ecount@1234',
  database: 'household_db',
});

connection.connect(error => {
  if (error) {
    throw error;
  }

  console.log('MySQL connected');
});

module.exports = db;
