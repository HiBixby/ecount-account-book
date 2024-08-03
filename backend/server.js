const express = require('express');

const transactions = require('./route/transactions');
const category = require('./route/category');
const report = require("./route/report")

const app = express();

app.use(express.json());

// CORS 설정 미들웨어
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //로컬 환경 아닐때 대비해서 *로 수정 ex) 발표 환경
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight 요청에 대한 응답
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use('/account', transactions);
app.use('/category', category);
app.use('/report', report);

const PORT = 5000;

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
