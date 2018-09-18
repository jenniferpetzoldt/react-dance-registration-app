const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET 
 */
router.get('/', (req, res) => {

});

/**
 * POST route 
 */
router.post('/', (req, res) => {
    console.log('form POST req.body', req.body);
    if (req.isAuthenticated()) {
        const formToAdd = req.body;
        const query = `INSERT INTO "wed_form" 
        ("month", "year", "level_one", "level_two", "level_three", "level_four", "level_five", "solo_jazz") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        pool.query(query, [formToAdd.newForm.month, formToAdd.newForm.year, formToAdd.newForm.levelOne, formToAdd.newForm.levelTwo, formToAdd.newForm.levelThree, formToAdd.newForm.levelFour, formToAdd.newForm.levelFive, formToAdd.newForm.soloJazz])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST form failed', error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatuas(403);
        }
    });

module.exports = router;