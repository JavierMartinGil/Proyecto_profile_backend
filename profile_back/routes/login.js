var express = require('express');
var router = express.Router();
const jwt = require('jwt-simple');
const moment = require('moment');

const modelLogin = require('../models/login');


router.post('/', (req, res) => {
    console.log(req.body);
    modelLogin.login(req.body)
        .then((result) => {
            console.log(result.id)
            res.json({ token_user: createToken(result) });
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