const express = require('express');
const app = express();
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'household_db',
    "timezone": "Asia/Seoul",
    "dateStrings": true
});

connection.connect();



app.get('/account', (req, res) => {
    const data = [
        {
            id: 1,
            time: "날짜1",
            asset: "카카오뱅크",
            type: "식비",
            content: "외식",
            price: 50000
        },
        {
            id: 2,
            time: "날짜2",
            asset: "카카오뱅크",
            type: "식비",
            content: "외식",
            price: -50001
        },

    ]
    const query =
        `
    SELECT 
        h.id AS id,
        h.transaction_date,
        h.asset,
        h.description as content,
        CASE 
            WHEN h.type = 'income' THEN h.amount
            WHEN h.type = 'expense' THEN -h.amount
            ELSE h.amount  -- 예외 처리: 타입이 income 또는 expense가 아닐 경우
        END AS price,
        c.name AS type
        FROM 
            household_account AS h
        JOIN 
            category AS c ON h.category_id = c.id;
    `;

    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        const formattedResults = results.map(row => {
            const date = new Date(row.transaction_date);
            console.log(date);
            return {
                id: row.id,
                transaction_date: date,
                asset: row.asset,
                content: row.content,
                price: row.price,
                type: row.type
            }
        });

        console.log(formattedResults);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(formattedResults);

    });


})

app.listen(5000)