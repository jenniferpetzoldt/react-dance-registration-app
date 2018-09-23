const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET months for select on admin attendance page
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "id", "form_month", "form_year" FROM "wed_form" WHERE "start_date" < now();`;
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

// GET specific Attendance data for selected month
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "id" = $1;`;
        pool.query(query, [req.params.id])
            .then((response) => {
                console.log('specific attendance get response', response.rows);
                res.send(response.rows);
            }).catch((error) => {
                console.log('GET specific form failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;