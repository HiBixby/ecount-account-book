const express = require('express');
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

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
