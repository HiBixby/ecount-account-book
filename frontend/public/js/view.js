import { deleteTransaction } from './api.js';
import { commaizeNumber, formatDate } from './utils.js';

const BACKEND = 'http://localhost:5000';
let current = new Date();

// 서버에서 거래 내역을 가져오는 함수
async function getHistory() {
  const response = await fetch(
    `${BACKEND}/account?year=${current.getFullYear()}&month=${
      current.getMonth() + 1
    }`,
  );
  return response.json();
}

// 테이블에 거래 내역을 렌더링하는 함수
export async function renderHistory() {
  const response = await getHistory();
  const table = document.querySelector('.view table tbody');
  table.innerHTML = ''; // 기존 테이블 내용 초기화

  let totalAmount = 0;
  let incomeCnt = 0;
  let incomeAmount = 0;
  let outcomeCnt = 0;
  let outcomeAmount = 0;

  response.forEach(data => {
    totalAmount += data.price;
    if (data.price > 0) {
      incomeCnt++;
      incomeAmount += data.price;
    } else {
      outcomeCnt++;
      outcomeAmount += data.price;
    }

    const tr = document.createElement('tr');
    tr.dataset.id = data.id;
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td><input type="checkbox" class="item" /></td>
      <td>${new Date(data.transaction_date).toLocaleString('ko-KR')}</td>
      <td>${data.asset}</td>
      <td>${data.type}</td>
      <td>${data.content}</td>
      <td class="${data.price > 0 ? 'plus' : 'minus'}">
        ${commaizeNumber(Math.abs(data.price))}원
      </td>
    `;
    table.appendChild(tr);
  });

  // 전체, 수입, 지출 정보를 업데이트
  document.querySelector('.view .total-cnt').textContent = response.length;
  const totalAmountElement = document.querySelector('.view .total-amount');
  totalAmountElement.textContent = commaizeNumber(Math.abs(totalAmount));
  totalAmountElement.parentElement.className =
    totalAmount > 0 ? 'plus' : 'minus';

  document.querySelector('.view .income-cnt').textContent = incomeCnt;
  document.querySelector('.view .income-amount').textContent =
    commaizeNumber(incomeAmount);

  document.querySelector('.view .outcome-cnt').textContent = outcomeCnt;
  document.querySelector('.view .outcome-amount').textContent = commaizeNumber(
    Math.abs(outcomeAmount),
  );

  // 개별 선택에 따라 전체 선택 체크박스 상태를 처리
  const itemCheckboxes = document.querySelectorAll('.item');
  itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
      document.querySelector('#select-all').checked = allChecked;
    });
  });
}

// 현재 월을 UI에 표시하는 함수
function renderMonth() {
  document.querySelector('.view .month').textContent = formatDate(current);
}

// 표시된 월을 변경하고 데이터를 다시 렌더링하는 함수
function showPrevMonth() {
  current.setMonth(current.getMonth() - 1);
  renderMonth();
  renderHistory();
}

function showNextMonth() {
  current.setMonth(current.getMonth() + 1);
  renderMonth();
  renderHistory();
}

// 보고서 페이지로 이동하는 함수
function openReport() {
  window.location.href = `report.html?year=${current.getFullYear()}&month=${`0${
    current.getMonth() + 1
  }`.slice(-2)}`;
}

export async function deleteSelectedTransaction() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  if (checkboxes.length === 0) {
    alert('삭제할 항목을 선택해주세요.');
    return;
  }

  if (!confirm('삭제하시겠습니까?')) {
    return;
  }

  const transactionIds = Array.from(checkboxes).map(
    checkbox => checkbox.closest('tr').dataset.id,
  );

  try {
    await Promise.all(transactionIds.map(id => deleteTransaction(id)));

    renderHistory();
  } catch (error) {
    alert('선택한 내역 삭제에 실패했습니다. 다시 시도해주세요.');
  }
}

// 이벤트 리스너 등록
document
  .querySelector('.view .button-left')
  .addEventListener('click', showPrevMonth);
document
  .querySelector('.view .button-right')
  .addEventListener('click', showNextMonth);
document.querySelector('.view .report').addEventListener('click', openReport);
document.querySelector('#select-all').addEventListener('click', () => {
  const selectAllCheckbox = document.querySelector('#select-all');
  document.querySelectorAll('.item').forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;
  });
});
document
  .querySelector('.btn-delete-transaction')
  .addEventListener('click', deleteSelectedTransaction);

// 초기 렌더링
renderHistory();
renderMonth();
