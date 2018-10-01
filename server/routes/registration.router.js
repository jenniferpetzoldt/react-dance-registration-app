const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// posts client side registrations to the database
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const regToAdd = req.body;
        const query = `INSERT INTO "registration" 
        ("person_id", "wed_form_id", "first_name", "last_name", "email", 
        "dancer_role", "admission", "first_hour", "second_hour", "payment_type", "owes") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
        pool.query(query, [regToAdd.newReg.personalInfo.userId,
        regToAdd.newReg.formId.formId,
        regToAdd.newReg.personalInfo.firstName,
        regToAdd.newReg.personalInfo.lastName,
        regToAdd.newReg.personalInfo.email,
        regToAdd.newReg.personalInfo.role,
        regToAdd.newReg.personalInfo.admission,
        regToAdd.newReg.lessons.firstHour,
        regToAdd.newReg.lessons.secondHour,
        regToAdd.newReg.payment.paymentMethod,
        regToAdd.newReg.total])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST registration failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

// gets all the registrations matching the selected registration form id
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "registration" WHERE "wed_form_id" = $1 ORDER BY "last_name" ASC;`;
        pool.query(query, [req.params.id])
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('Registration GET error', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

// deletes the specific registration by its id
router.delete('/:id', (req, res) => {
    console.log('registration DELETE req.params.id', req.params.id);
    if (req.isAuthenticated()) {
        const query = `DELETE FROM "registration" WHERE "id" = $1;`;
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

router.put('/weekOne/:id', (req, res) => {
    console.log('admin UPDATE req.body', req.body);
    const regToUpdate = req.body;
    const id = req.params.id;
    const query =  `UPDATE "registration" SET "week_one" = ($1) WHERE "id" = ($2);`;
    pool.query(query, [regToUpdate.week1, id])
    .then((results) => {
        console.log('registration updated');
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error with update', error);
        res.sendStatus(500);
    });
});

module.exports = router;