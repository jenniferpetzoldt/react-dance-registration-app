const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET session month and year for select on main user registration page that are in the future
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "id", "form_month", "form_year" FROM "wed_form" WHERE "start_date" > now();`;
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

// GET class names, month, and year for selected session sorted ascending by date
router.get('/:id', (req, res) => {
    console.log('specific form GET req.body', req.params);
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "id" = $1 ORDER BY "start_date" ASC;`;
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


// post route to add forms created by they admin
router.post('/', (req, res) => {
    console.log('form POST req.body', req.body);
    if (req.isAuthenticated()) {
        const formToAdd = req.body;
        const query = `INSERT INTO "wed_form" 
        ("start_date", "form_month", "form_year", "level_one", "level_two", "level_three", "level_four", "level_five", "solo_jazz") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        pool.query(query, [formToAdd.newForm.startDate, formToAdd.newForm.month, formToAdd.newForm.year, formToAdd.newForm.levelOne, formToAdd.newForm.levelTwo, formToAdd.newForm.levelThree, formToAdd.newForm.levelFour, formToAdd.newForm.levelFive, formToAdd.newForm.soloJazz])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST form failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;