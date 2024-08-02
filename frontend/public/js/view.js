const BACKEND = "http://localhost:5000"
async function getHistory() {
    const response = await fetch(BACKEND + "/account");
    return response.json();
}

function commaizeNumber(value) {
    return value.toLocaleString('ko-KR');
}

async function renderHistory() {
    const response = await getHistory();
    const table = document.querySelector(".view table");
    console.log(response);
    let totalAmount = 0;
    let incomeCnt = 0;
    let incomeAmount = 0;
    let outcomeCnt = 0;
    let outcomeAmount = 0;
    for (let data of response) {
        totalAmount += data.price;
        if (data.price > 0) {
            incomeCnt++;
            incomeAmount += data.price;
        }
        else {
            outcomeCnt++;
            outcomeAmount += data.price
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><input type="checkbox" /></td>
                <td>${data.transaction_date}</td>
                <td>${data.asset}</td>
                <td>${data.type}</td>
                <td>${data.content}</td>
                <td class="${data.price > 0 ? `plus` : `minus`}">${commaizeNumber(Math.abs(data.price)) + "원"}</td>`
        table.insertBefore(tr, null);
    }
    //전체 건수, 전체 금액 설정
    const totalCntElement = document.querySelector(".view .total-cnt");
    totalCntElement.innerHTML = response.length;
    const totalAmountElement = document.querySelector(".view .total-amount");
    totalAmountElement.innerHTML = commaizeNumber(Math.abs(totalAmount));
    if (totalAmount > 0) totalAmountElement.parentElement.className = "plus"
    else totalAmountElement.parentElement.className = "minus"
    // 수입 건수, 수입 금액 설정
    const incomeCntElement = document.querySelector(".view .income-cnt");
    incomeCntElement.innerHTML = incomeCnt;
    const incomeAmountElement = document.querySelector(".view .income-amount");
    incomeAmountElement.innerHTML = commaizeNumber(incomeAmount);
    //지출 건수, 지출 금액 설정
    const outcomeCntElement = document.querySelector(".view .outcome-cnt");
    outcomeCntElement.innerHTML = outcomeCnt;
    const outcomeAmountElement = document.querySelector(".view .outcome-amount");
    outcomeAmountElement.innerHTML = commaizeNumber(Math.abs(outcomeAmount));
}

let current = new Date();

function formatDate() {
    let year = current.getFullYear();
    let month = `0${current.getMonth() + 1}`.slice(-2);
    let yyyymm = year + "-" + month;
    return yyyymm;
}
function renderMonth() {
    document.querySelector(".view .month").innerHTML = formatDate();

}
function showPrevMonth() {
    current.setMonth(current.getMonth() - 1);
    renderMonth();
}
function showNextMonth() {
    current.setMonth(current.getMonth() + 1);
    renderMonth();
}
function showThisMonth() {
    current = new Date();
    renderMonth();
}
renderHistory();
renderMonth();

document.querySelector(".view .button-left").addEventListener("click", showPrevMonth);
document.querySelector(".view .button-right").addEventListener("click", showNextMonth);
document.querySelector(".view .reset-month").addEventListener("click", showThisMonth);
