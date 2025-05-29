const sqlite3 = require('sqlite3').verbose();
const express = require('express');
//const fs = require('fs'); 필요없음
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../views')); //'../views'로 변경

//SQLite DB 연결 (절대 경로 또는 상태경로 사용가능)
const db = new sqlite3.Database('C:/database/sqlite/comicbook.db', (err) => {
    if (err) {
        console.error('X SQLite 연결 실패:', err.message);
    } else {
        console.log('O SQLite 연결 성공');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});


//루트 페이지 - books 테이블 데이터 조회
app.get('/', (req, res) => {
        //SQLite SELECT 쿼리
        db.all('SELECT * FROM books', (err, rows) => {
            if (err) {
                res.status(500).send('X DB 조회 오류:' + err.message);
                return;
            }

            //EJS 렌더링
            res.render('bookList', {data:rows});
        });
});
