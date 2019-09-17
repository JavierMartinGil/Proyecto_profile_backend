var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

const modelRegistro = require('../models/registro');


router.post('/nuevo', (req, res) => {
    console.log(req.body);
    // req.body.password = bcrypt.hash(req.body.password, SECRET_KEY);
    modelRegistro.registro(req.body)
        .then((result) => {
            console.log(result);
            res.json(result);

        })
        .catch((err) => {
            res.json({ error: err.message });
        })
})

module.exports = router;