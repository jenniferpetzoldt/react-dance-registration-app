const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('registration POST req.body', req.body);
    if (req.isAuthenticated()) {
        const regToAdd = req.body;
        const query = `INSERT INTO "registration" 
        ("person_id", "wed_form_id", "first_name", "last_name", "email", "dancer_role", "admission", "first_hour", "second_hour", "payment_type") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        pool.query(query, [regToAdd.newReg.userInfo.userId,
        regToAdd.newReg.formId.formId,
        regToAdd.newReg.userInfo.firstName,
        regToAdd.newReg.userInfo.lastName,
        regToAdd.newReg.userInfo.email,
        regToAdd.newReg.userInfo.role,
        regToAdd.newReg.userInfo.admission,
        regToAdd.newReg.firstHour.className,
        regToAdd.newReg.secondHour.className,
        regToAdd.newReg.payment.paymentMethod])
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

module.exports = router;