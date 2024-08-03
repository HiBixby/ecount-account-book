import { openInputForm, closeInputForm } from './form.js';

document
  .querySelector('.btn-add-transaction')
  .addEventListener('click', () => openInputForm());
document.querySelector('.btn-close').addEventListener('click', closeInputForm);
document.querySelector('.view table').addEventListener('click', event => {
  // 체크박스 클릭 시 입력 폼 열지 않음
  if (event.target.type === 'checkbox') {
    return;
  }

  const tr = event.target.closest('tr');
  if (tr && tr.dataset.id) {
    openInputForm(tr.dataset.id);
  }
});
