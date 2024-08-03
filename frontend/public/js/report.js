import { getMonthlyExpenses } from './api.js';
import { commaizeNumber } from './utils.js';

const BACKEND = 'http://localhost:5000';
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const year = params.get('year');
const month = params.get('month');

// 서버에서 수입 데이터를 가져오는 함수
async function getIncome(year, month) {
  const response = await fetch(
    `${BACKEND}/report/income?year=${year}&month=${month}`,
  );
  return response.json();
}

// 데이터를 테이블에 보여주는 함수
async function showData(year, month, type) {
  const table = document.querySelector(`.${type}`);
  const data =
    type === 'income'
      ? await getIncome(year, month)
      : await getMonthlyExpenses(year, month);

  let sum = 0;
  const dataByType = {};

  // 데이터를 순회하면서 총 수입 및 타입별 수입을 계산
  data.forEach(d => {
    sum += d.total_price;
    if (!dataByType[d.parent_type]) {
      dataByType[d.parent_type] = [];
    }
    dataByType[d.parent_type].push([d.type, d.total_price]);
  });

  console.log(dataByType);
  console.log(sum);

  // 총 수입을 테이블에 추가
  table.innerHTML = `
        <tr style="background-color: ${
          type === 'income' ? '#e0eafb' : '#f7e8e8'
        }; font-size: 18px">
            <td><b>총 ${type === 'income' ? '수입' : '지출'}</b></td>
            <td style="font-weight: bold;">${commaizeNumber(sum)}원</td>
        </tr>
    `;

  // 타입별 수입을 테이블에 추가
  for (const [parentType, types] of Object.entries(dataByType)) {
    const parentRow = document.createElement('tr');
    parentRow.innerHTML = `<td><b>${parentType}</b></td><td></td>`;
    table.appendChild(parentRow);

    types.forEach(([type, total_price]) => {
      const typeRow = document.createElement('tr');
      typeRow.innerHTML = `<td style="font-size: 14px; padding-left: 20px">${type}</td><td>${commaizeNumber(
        total_price,
      )}원</td>`;
      table.appendChild(typeRow);
    });
  }
}

// 현재 월을 UI에 표시하는 함수
function showMonth() {
  document.querySelector('h2').textContent = `${year}년 ${month}월`;
}

// 초기 화면 렌더링
showData(year, month, 'income');
showData(year, month, 'expense');
showMonth();
