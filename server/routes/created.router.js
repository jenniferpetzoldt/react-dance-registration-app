const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form";`;
        pool.query(query)
        .then((response) => {
            console.log('created forms GET:', response.rows);
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET created forms failed', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;