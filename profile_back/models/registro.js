const db = require('../db');

const registro = ({ email, address, username, password }) => {
    // req.body.password = bcrypt.hash(req.body.password)
    return new Promise((resolve, reject) => {
        let q = 'insert into usuarios (email, address, username, password) values (?, ?, ?, ?)';
        db.get().query(q, [email, address, username, password], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

module.exports = {
    registro: registro
}