const express = require('express');
const db = require('../lib/db');

const router = express.Router();

/* 수입 통계 */
router.get('/income', (req, res) => {
  const year = req.query.year;
  const month = req.query.month;

  const query = `
        SELECT 
            p.name AS parent_type,
            c.name AS type,
            SUM(h.amount) AS total_price
        FROM 
            household_account AS h
        JOIN 
            category AS c ON h.category_id = c.id
        LEFT JOIN 
            category AS p ON c.parent_id = p.id
        WHERE 
            h.type = 'income'
            AND YEAR(h.transaction_date) = ?
            AND MONTH(h.transaction_date) = ?
        GROUP BY 
            p.name, c.name
        ORDER BY 
            p.name, c.name;
    `;

  db.query(query, [year, month], (error, results, fields) => {
    if (error) throw error;

    const formattedResults = results.map(row => ({
      parent_type: row.parent_type,
      type: row.type,
      total_price: row.total_price,
    }));

    res.json(formattedResults);
  });
});

/* 지출 통계 */
router.get('/expense', (req, res) => {
  const { year, month } = req.query;

  const query = `
        SELECT 
            p.name AS parent_type,
            c.name AS type,
            SUM(h.amount) AS total_price
        FROM
            household_account AS h
        JOIN 
            category AS c ON h.category_id = c.id
        LEFT JOIN 
            category AS p ON c.parent_id = p.id
        WHERE 
            h.type = 'expense'
            AND YEAR(h.transaction_date) = ?
            AND MONTH(h.transaction_date) = ?
        GROUP BY 
            p.name, c.name
        ORDER BY 
            p.name, c.name;
    `;

  db.query(query, [year, month], (error, results) => {
    if (error) throw error;

    const formattedResults = results.map(row => ({
      parent_type: row.parent_type,
      type: row.type,
      total_price: row.total_price,
    }));

    res.json(formattedResults);
  });
});

module.exports = router;
