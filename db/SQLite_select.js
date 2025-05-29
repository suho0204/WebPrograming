const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// DB 연결
const db = new sqlite3.Database('C:/database/sqlite/comicbook.db', (err) => {
    if (err) console.error('❌ SQLite 연결 실패:', err.message);
    else console.log('✅ SQLite 연결 성공');
});

// 🔽 경로 수정 중요!
const modifyRoutes = require('./SQLite_modify')(db);
const deleteRoutes = require('./SQLite_delete')(db);
app.use(modifyRoutes);
app.use(deleteRoutes);

// 목록
app.get('/', (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) return res.status(500).send('❌ DB 조회 오류: ' + err.message);
        res.render('bookList', { data: rows });
    });
});

// 추가
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/insertNewBook.html'));
});

app.post('/create', (req, res) => {
    const { genre, name, writer, releasedate } = req.body;
    db.run('INSERT INTO books (genre, name, writer, releasedate) VALUES (?,?,?,?)', [genre, name, writer, releasedate], function (err) {
        if (err) return res.status(500).send('❌ INSERT 실패: ' + err.message);
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
});
