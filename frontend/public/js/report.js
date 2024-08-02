const BACKEND = "http://localhost:5000"
async function getIncome(year, month) {
    const response = await fetch(BACKEND + `/report/income?year=${year}&month=${month}`);
    return response.json();
}
function commaizeNumber(value) {
    return value.toLocaleString('ko-KR');
}

async function showIncome(year, month) {
    const table = document.querySelector(".income");
    const data = await getIncome(year, month);
    console.log(data);
    // 총 수입 보여주기
    let sum = 0;
    let dic = {};
    for (let d of data) {
        sum += d.total_price;

        if (dic[d.parent_type] != undefined) {
            dic[d.parent_type].push([d.type, d.total_price]);
        } else {
            dic[d.parent_type] = [];
            dic[d.parent_type].push([d.type, d.total_price]);
        }
    }
    console.log(dic)
    console.log(sum)
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><b>총 수입</b></td><td>${commaizeNumber(sum) + "원"}</td>`
    table.insertBefore(tr, null);
    //타입별 수입 보여주기
    for (let k in dic) {
        console.log(k)
        const tr = document.createElement("tr");
        tr.innerHTML = `<td><b>${k}</b></td>`
        table.insertBefore(tr, null);
        for (let e of dic[k]) {
            console.log(e);
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${e[0]}</td><td>${commaizeNumber(e[1]) + "원"}</td>`
            table.insertBefore(tr, null);
        }
    }
}
showIncome(2024, 8);