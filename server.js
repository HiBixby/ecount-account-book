const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const app = express()

app.get('/view', (req, res) => {
    const data = [
        {
            id: 1,
            time: "날짜1",
            asset: "카카오뱅크",
            type: "식비",
            content: "외식",
            price: "50000"
        },
        {
            id: 2,
            time: "날짜2",
            asset: "카카오뱅크",
            type: "식비",
            content: "외식",
            price: "-50000"
        },

    ]
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
})

app.listen(5000)
