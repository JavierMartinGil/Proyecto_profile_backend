var express = require('express');
var router = express.Router();
const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');

const modelLogin = require('../models/login');


router.post('/', (req, res) => {
    modelLogin.login(req.body.email)
        .then((result) => {
            bcrypt.compare(req.body.password, result.password, (err, same) => {
                if (err) return res.json({ error: 'Error!!!!' })
                if (!same) return res.json({ error: 'Usuario y o contraseña erroneos (2)' })
                res.json({ token_user: createToken(result) });
            });

        })
        .catch((err) => {
            res.json({ error: err.message });
        })
})


const createToken = (pUser) => {
    const payload = {
        userId: pUser.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, 'process.env.SECRET_KEY');
}

module.exports = router;