const express = require('express');
const db = require('../lib/db');

const router = express.Router();

/** 하위 카테고리 가져오기 */
router.get('/sub', (req, res) => {
  const { type } = req.query;

  // type이 수입(income) or 지출(expense)이 아닐 경우 error
  if (!type || !['income', 'expense'].includes(type)) {
    return res.status(400).send('타입을 확인해주세요');
  }

  const query =
    'SELECT * FROM category WHERE parent_id IS NOT NULL AND type = ?';

  db.query(query, type, (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(results);
  });
});

module.exports = router;
