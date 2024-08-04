const express = require('express');
const path = require('path');

const app = express();
const port = 80; // 원하는 포트 번호로 변경할 수 있습니다.

// 정적 파일이 위치한 디렉토리 경로
const staticPath = path.join(__dirname, 'dist');

// 정적 파일 제공
app.use(express.static(staticPath));

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
