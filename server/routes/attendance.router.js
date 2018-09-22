const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET months for select on admin attendance page
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "form_month", "form_year" FROM "wed_form" WHERE "start_date" < now();`;
        pool.query(query)
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('GET form failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

// GET specific Form data for selected month
router.get('/:id', (req, res) => {
    console.log('specific form GET req.body', req.params);
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "id" = $1;`;
        pool.query(query, [req.params.id])
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('GET specific form failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
})


module.exports = router;