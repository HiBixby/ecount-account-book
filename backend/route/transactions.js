const express = require('express');
const db = require('../lib/db');

const router = express.Router();

/** 수입 지출 생성 */
router.post('/', (req, res) => {
  const {
    transaction_date,
    asset,
    category_id,
    description,
    amount,
    memo,
    type,
  } = req.body;

  if (!transaction_date || !asset || !category_id || !amount || !type) {
    return res.status(400).send('input value error');
  }

  const query =
    'INSERT INTO household_account (transaction_date, asset, category_id, description, amount, memo, type) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(
    query,
    [transaction_date, asset, category_id, description, amount, memo, type],
    err => {
      if (err) {
        return res.status(500).send('database error');
      }
      res.send(`${type} inserted successfully`);
    },
  );
});

/** 수입 지출 수정  */
router.put('/:id', (req, res) => {
  const { transaction_date, asset, category_id, description, amount, type } =
    req.body;

  if (
    !transaction_date ||
    !asset ||
    !category_id ||
    !description ||
    !amount ||
    !type
  ) {
    return res.status(400).send('input value error');
  }

  const query = 'UPDATE household_account SET ? WHERE id = ?';

  db.query(query, [req.body, req.params.id], err => {
    if (err) {
      return res.status(500).send('database error');
    }
    res.send('updated successfully');
  });
});

/** 수입 지출 삭제  */
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM household_account WHERE id = ${req.params.id}`;

  db.query(query, err => {
    if (err) {
      return res.status(500).send('database error');
    }
    res.send('deleted successfully');
  });
});

module.exports = router;
