// 숫자를 한국 로케일에 맞게 쉼표로 구분하는 함수
export function commaizeNumber(value) {
  return value.toLocaleString('ko-KR');
}

// 날짜를 'YYYY-MM' 형식으로 포맷하는 유틸리티 함수
export function formatDate(date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${year}-${month}`;
}
