const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/modify/:id', (req, res) => {
        const id = req.params.id;
        db.get('SELECT * FROM books WHERE number=?', [id], (err, row) => {
            if (err) return res.status(500).send('❌ 수정 데이터 불러오기 실패');
            res.render('modify', { data: row });
        });
    });

    router.post('/modify/:id', (req, res) => {
        const id = req.params.id;
        const { genre, name, writer } = req.body;
        db.run('UPDATE books SET genre=?, name=?, writer=? WHERE number=?', [genre, name, writer, id], function (err) {
            if (err) return res.status(500).send('❌ 수정 실패: ' + err.message);
            res.redirect('/');
        });
    });

    return router;
};
