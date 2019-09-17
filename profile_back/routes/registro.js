var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

const modelRegistro = require('../models/registro');


router.post('/nuevo', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    modelRegistro.registro(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ error: err.message });
        })
})

module.exports = router;