const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Gets all the created forms and sorts them by date. Only gets forms for future months
// to populate table of created registration forms
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "start_date" > now() ORDER BY "start_date" ASC;`;
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

// deletes the selected form based on it's id, removes from table and from database
router.delete('/:id', (req, res) => {
    console.log('form DELETE req.params.id', req.params.id);
    if (req.isAuthenticated()) {
        const query = `DELETE FROM "wed_form" WHERE "id" = $1`;
        pool.query(query, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Registration DELETE error', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;