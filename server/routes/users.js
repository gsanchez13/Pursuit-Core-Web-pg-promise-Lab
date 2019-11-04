const express = require('express');
const router = express.Router();
const db = require('./database/db.js');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json())

router.get('/', async (req, res) => {
    try {
        let users = await db.any("SELECT * FROM users")
        res.json({
            payload: users,
            message:"Success. Retrieved all the users."
        });
    } catch(error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})
router.post('/register', async (req, res) => {
    try { 
        let insertQuery = `INSERT INTO users(firstname, lastname, age)
        values($1, $2, $3)`
    await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
        res.json({
        payload: req.body,
        message: "POST request recieved at users/register"
    })
} catch(error) {
        res.json({
            message: "there was an error registering the user"
        })
    }
})
module.exports = router;

// any => get everything
// one => one row of specified query
// none => new information being given