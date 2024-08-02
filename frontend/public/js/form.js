import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from '../api.js';

const form = document.forms.transaction;

const params = new URLSearchParams(window.location.search);
const transactionId = params.get('transaction_id');

const deleteButton = document.getElementById('delete-btn');
const addButton = document.querySelector('.btn-add-transaction');
const aside = document.querySelector('.transaction-aside');
const formCloseButton = document.querySelector('.btn-close');
const view = document.querySelector('.view');
const floatingButtonContainer = document.querySelector(
  '.floating-btn-container',
);

function initForm() {
  // TODO: 목록에서 내역 클릭 시 해당 내역 상세 불러오기
  // TODO: 카테고리 분류 select tag 하위 option으로 채우기

  if (!transactionId) {
    deleteButton.disabled = true;
  }
}

initForm();

async function submitHandler(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const asset = document.getElementById('asset').value;
  const categoryId = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const memo = document.getElementById('memo').value;
  const type = document.querySelector(
    'input[name="transaction_type"]:checked',
  ).value;

  const transactionData = {
    transaction_date: `${date} ${time}`,
    category_id: categoryId,
    asset,
    amount,
    description,
    memo,
    type,
  };

  // 수입 지출 새로 추가
  if (!transactionId) {
    addTransaction(transactionData);
  } else {
    updateTransaction(transactionId, transactionData);
  }
}

async function deleteHandler() {
  await deleteTransaction(transactionId);
  alert('삭제 완료');
}

form.addEventListener('submit', submitHandler);
deleteButton.addEventListener('click', deleteHandler);

// 폼 열고 닫는 이벤트
addButton.addEventListener('click', () => {
  aside.classList.add('open');
  view.style.marginRight = '440px';
  floatingButtonContainer.style.right = '460px';
});

formCloseButton.addEventListener('click', () => {
  aside.classList.remove('open');
  view.style.marginRight = '0';
  floatingButtonContainer.style.right = '20px';
});
