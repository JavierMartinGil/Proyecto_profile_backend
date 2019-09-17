var express = require('express');
var router = express.Router();
let jwt = require('jwt-simple');
const moment = require('moment');

const modelPerfil = require('../models/perfil');


router.get('/', (req, res) => {
    if (!req.headers['token_user']) {
        return res.json({ error: 'No estás logueado' })
    }
    let token = req.headers['token_user'];
    let payload = null
    try {
        payload = jwt.decode(token, 'process.env.SECRET_KEY');
        console.log('payload: ' + payload.userId)
    } catch (err) {
        return res.json({ error: 'Existe un error con el token. No es posible decodificar' })
    }
    let usuario = modelPerfil.verPerfil(payload.userId)
        .then((result) => {
            console.log(result)
            if (!result) {
                return res.json({ error: 'Existe un error con el token. No existe el usuario en la BD' })
            }
            res.json(result);
        })

})

module.exports = router;