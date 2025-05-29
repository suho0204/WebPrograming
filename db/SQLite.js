const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join('C:','database','sqlite','comicbook.db');

// comicbook.db 파일에 연결
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ 데이터베이스 연결 실패:', err.message);
        return;
    }
    console.log('✅ SQLite DB 연결 성공');
});

db.all('SELECT * FROM books', (err, rows) => {   //SELECT 쿼리 실행
    if (err) {
        console.error('❌ SELECT 쿼리 오류:', err.message);
    } else {
        console.log('📚 books 테이블 전체 조회 결과:');
        console.table(rows); // 표 형태로 출력 (가독성 ↑)
    }
    // 연결 종료
    db.close((err) => {
        if (err) {
            console.error('❌ 연결 종료 중 오류:', err.message);
        } else {
            console.log('🔚 SQLite 연결 종료 완료');
        }
    });
});