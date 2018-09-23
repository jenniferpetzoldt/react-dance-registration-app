const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('admin POST req.body', req.body);
    // if (req.isAuthenticated()) {
    //     const regToAdd = req.body;
    //     const query = `INSERT INTO "registration" 
    //      ("wed_form_id", "first_name", "last_name", "email", "dancer_role", "admission", "first_hour", "second_hour", "payment_type") 
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    // }
})

module.exports = router;