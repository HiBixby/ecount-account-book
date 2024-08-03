import {
  addTransaction,
  deleteTransaction,
  getCategories,
  getTransactionDetail,
  updateTransaction,
} from './api.js';
import { renderHistory } from './view.js';

let transactionId = null;

const form = document.forms.transaction;
const deleteButton = document.getElementById('delete-btn');
const aside = document.querySelector('.transaction-aside');
const view = document.querySelector('.view');
const floatingButtonContainer = document.querySelector(
  '.floating-btn-container',
);

async function initForm() {
  if (!transactionId) {
    deleteButton.disabled = true;
    renderCategory();
  } else {
    deleteButton.disabled = false;

    try {
      const {
        type,
        transaction_date,
        asset,
        category_id,
        amount,
        description,
        memo,
      } = await getTransactionDetail(transactionId);

      document.querySelector(
        `input[name="transaction_type"][value="${type}"]`,
      ).checked = true;
      // 수입 / 지출 타입 확인 후 분류 다시 가져와서 렌더링
      await renderCategory();

      document.getElementById('date').value = transaction_date.slice(0, 10);
      document.getElementById('time').value = transaction_date.slice(11, 16);
      document.getElementById('asset').value = asset;
      document.getElementById('category').value = category_id;
      document.getElementById('amount').value = amount;
      document.getElementById('description').value = description;
      document.getElementById('memo').value = memo;
    } catch (error) {
      alert('상세 내역을 불러오는데 실패했습니다.');
    }
  }
}

async function renderCategory() {
  const type = document.querySelector(
    'input[name="transaction_type"]:checked',
  ).value;

  const categorySelect = document.getElementById('category');
  try {
    const categories = await getCategories(type);

    // 기존 존재하는 분류 옵션 제거, 기본 옵션 추가
    categorySelect.innerHTML =
      '<option value="none" selected disabled hidden>분류 선택</option>';

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    alert('카테고리 목록을 불러오는데 실패했습니다.');
  }
}

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

  if (categoryId === 'none') {
    alert('분류를 선택해주세요.');
    return;
  }

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
  try {
    if (!transactionId) {
      await addTransaction(transactionData);
    } else {
      await updateTransaction(transactionId, transactionData);
    }

    renderHistory();
    closeInputForm();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteHandler() {
  try {
    await deleteTransaction(transactionId);

    alert('삭제가 완료되었습니다.');
    renderHistory();
    closeInputForm();
  } catch (error) {
    alert('삭제에 실패했습니다. 다시 시도해주세요.');
  }
}

export function openInputForm(id = null) {
  transactionId = id;
  aside.classList.add('open');
  view.style.marginRight = '440px';
  floatingButtonContainer.style.right = '460px';
  initForm();
}

export function closeInputForm() {
  aside.classList.remove('open');
  view.style.marginRight = '0';
  floatingButtonContainer.style.right = '20px';
  transactionId = null; // 닫을 때 id 초기화
  form.reset();
}

// 이벤트 리스너 등록 코드
const radioButtons = document.querySelectorAll(
  'input[name="transaction_type"]',
);
radioButtons.forEach(radio => {
  radio.addEventListener('change', renderCategory); // 수입, 지출 선택 바꿀 때마다 카테고리 목록 가져오기
});

form.addEventListener('submit', submitHandler);
deleteButton.addEventListener('click', deleteHandler);
