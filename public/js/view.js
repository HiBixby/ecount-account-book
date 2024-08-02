const BACKEND = "http://localhost:5000"
async function getHistory() {
    const response = await fetch(BACKEND + "/account");
    return response.json();
}

function commaizeNumber(value) {
    const numStr = String(value);
    const decimalPointIndex = numStr.indexOf('.');
    const commaizeRegExp = /(\d)(?=(\d\d\d)+(?!\d))/g;

    return decimalPointIndex > -1
        ? numStr.slice(0, decimalPointIndex).replace(commaizeRegExp, '$1,') + numStr.slice(decimalPointIndex)
        : numStr.replace(commaizeRegExp, '$1,');
}

async function renderHistory() {
    const response = await getHistory();
    const table = document.querySelector(".view table");
    console.log(response);
    for (let data of response) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><input type="checkbox" /></td>
                <td>${data.time}</td>
                <td>${data.asset}</td>
                <td>${data.type}</td>
                <td>${data.content}</td>
                <td class="${data.price > 0 ? `plus` : `minus`}">${commaizeNumber(Math.abs(data.price)) + "원"}</td>`
        table.insertBefore(tr, null);
    }
}
renderHistory();