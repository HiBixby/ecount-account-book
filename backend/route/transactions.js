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
    return res.status(400).json({ message: '필수 항목을 입력해주세요.' });
  }

  const query =
    'INSERT INTO household_account (transaction_date, asset, category_id, description, amount, memo, type) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(
    query,
    [transaction_date, asset, category_id, description, amount, memo, type],
    err => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({ message: `${type} inserted successfully` });
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
    return res.status(400).json({ message: '필수 항목을 입력해주세요.' });
  }

  const query = 'UPDATE household_account SET ? WHERE id = ?';

  db.query(query, [req.body, req.params.id], err => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'updated successfully' });
  });
});

/** 수입 지출 삭제  */
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM household_account WHERE id = ${req.params.id}`;

  db.query(query, err => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'deleted successfully' });
  });
});

router.get('/', (req, res) => {
  const query = `
    SELECT h.id          AS id,
          h.transaction_date,
          h.asset,
          h.description AS content,
          CASE
            WHEN h.type = 'income' THEN h.amount
            WHEN h.type = 'expense' THEN -h.amount
            ELSE h.amount
          -- 예외 처리: 타입이 income 또는 expense가 아닐 경우
          end           AS price,
          c.name        AS type
    FROM   household_account AS h
          JOIN category AS c
            ON h.category_id = c.id
    WHERE  Year(transaction_date) = "${req.query.year}"
          AND Month(transaction_date) = "${req.query.month}"
    ORDER  BY transaction_date DESC; 
  `;

  db.query(query, (error, results, fields) => {
    if (error) throw error;
    const formattedResults = results.map(row => {
      const date = new Date(row.transaction_date);

      return {
        id: row.id,
        transaction_date: date,
        asset: row.asset,
        content: row.content,
        price: row.price,
        type: row.type,
      };
    });

    res.json(formattedResults);
  });
});

router.get('/detail/:id', (req, res) => {
  const query = `SELECT * FROM household_account WHERE id = ${req.params.id}`;

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(rows[0]);
  });
});

module.exports = router;
