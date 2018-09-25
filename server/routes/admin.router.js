const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('admin POST req.body', req.body);
    if (req.isAuthenticated()) {
        const regToAdd = req.body;
        const query = `INSERT INTO "registration" 
         ("wed_form_id", "first_name", "last_name", "email", "dancer_role", "admission", "first_hour", 
         "second_hour", "paid", "payment_type", "week_one", "week_two", "week_three", "week_four") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
        pool.query(query, [regToAdd.newReg.formid,
            regToAdd.newReg.firstName,
            regToAdd.newReg.lastName,
            regToAdd.newReg.email,
            regToAdd.newReg.role,
            regToAdd.newReg.admission,
            regToAdd.newReg.first,
            regToAdd.newReg.second,
            regToAdd.newReg.paid,
            regToAdd.newReg.paymentMethod,
            regToAdd.newReg.week1,
            regToAdd.newReg.week2,
            regToAdd.newReg.week3,
            regToAdd.newReg.week4])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST registration from add dancer failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;