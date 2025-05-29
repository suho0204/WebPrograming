//sqlite3 모듈 로드
const sqlite3 = require('sqlite3').verbose(); //sqlite3 모듈 install 필요

const path = require('path');
const dbPath = path.join('C:','database','sqlite','comicbook.db');
console.log('DB경로:',dbPath);
//comicbook.db 파일에 연결(없으면 자동 생성됨)
const db = new sqlite3.Database(dbPath,(err)=>{
    if(err) {
        console.error('X 데이터베이스 연결 실패:',err.message);
    } else {
        console.log('O SQLite 데이터베이스 연결 성공');
    }
});

//books 테이블 생성 쿼리
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
    number INTEGER PRIMARY KEY AUTOINCREMENT,
    genre TEXT NOT NULL,
    name TEXT NOT NULL,
    writer TEXT NOT NULL,
    releasedate DATE NOT NULL
    );`;

//테이블 생성 실행
db.run(createTableQuery,(err) => {
    if (err) {
        console.error('X 테이블 생성 실패:',err.message);
    } else {
        console.log('books 테이블이 생성되었습니다.');

        //테이블 구조 출력
            db.all('PRAGMA table_info(books);',(err,rows) =>{
                if (err) {
                    console.error('X 테이블 구조 조회 실패:', err.message);
                } else {
                    console.log('테이블 구조:');
                    console.table(rows);
                }

                //연결 종료
                    db.close((err) => {
                        if(err) {
                            console.error('X 연결 종료 중 오류:',err.message);
                        } else {
                            console.log('SQLite 연결 종료 완료');
                        }
                    });
            });
    }
});