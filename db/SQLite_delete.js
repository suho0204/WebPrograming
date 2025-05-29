const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        db.run('DELETE FROM books WHERE number=?', [id], function (err) {
            if (err) return res.status(500).send('❌ 삭제 실패: ' + err.message);
            res.redirect('/');
        });
    });

    return router;
};
