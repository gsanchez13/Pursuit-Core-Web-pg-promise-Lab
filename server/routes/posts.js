const express = require('express');
const router = express.Router();
const {db }= require('./database/db.js');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json())

router.get('/all', async (req, res) => {
    try {
        let posts = await db.any("SELECT * FROM posts");
        res.json({
            payload: posts,
            message: "Success. Retreived all posts."
        })
    } 
    catch {
        res.json({
            message: "Error. Could not obtain posts."
        })
    }
})
router.get('/:user_id', async (req, res) => {
    let id = req.params.user_id;
    console.log(id)
    try{
        let usersPost = await db.any(`SELECT body FROM posts WHERE poster_id = $1`,[id])
        res.json({
            payload: usersPost,
            message: "Sucess! Users posts loaded."
        })
    }
    catch(error) {
        res.json({
            message: "Error, could not obtain users posts."
        })
    }
})

module.exports = router