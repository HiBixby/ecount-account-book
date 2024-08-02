const express = require('express');

const transactions = require('./route/transactions');
const category = require('./route/category');

const app = express();

app.use(express.json());
app.use('/account', transactions);
app.use('/category', category);

const PORT = 5000;

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
