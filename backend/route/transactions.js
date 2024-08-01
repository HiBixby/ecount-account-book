const express = require('express');
const db = require('../lib/db');

const router = express.Router();

/** 수입 지출 생성 */
router.post('/', (req, res) => {
  const { datetime, category_id, description, amount, memo, type } = req.body;

  if (!datetime || !category_id || !description || !amount || !type) {
    return res.status(400).send('input value error');
  }

  const query =
    'INSERT INTO household_account (datetime, category_id, description, amount, memo, type) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('database error');
    }
    res.send(`${type} inserted successfully`);
  });
});

/** 수입 지출 수정  */
router.put('/:id', (req, res) => {
  const { datetime, category_id, description, amount, memo, type } = req.body;

  if (!datetime || !category_id || !description || !amount || !type) {
    return res.status(400).send('input value error');
  }

  const query =
    'UPDATE household_account SET (datetime, category_id, description, amount, memo, type) VALUES (?, ?, ?, ?, ?, ?) WHERE id = ?';

  db.query(query, [req.body, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send('database error');
    }
    res.send('updated successfully');
  });
});

/** 수입 지출 삭제  */
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM household_account WHERE id = ${req.params.id}`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('database error');
    }
    res.send('deleted successfully');
  });
});
