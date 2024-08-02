const express = require('express');

const transactions = require('./route/transactions');

const app = express();

app.use(express.json());
app.use('/account', transactions);

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
