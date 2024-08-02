const express = require('express');
const app = express();
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'household_db'
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
    connection.query('select * from household_db.category', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
    });


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
})

app.listen(5000)