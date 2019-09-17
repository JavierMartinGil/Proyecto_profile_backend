const db = require('../db');

const verPerfil = (id) => {
    return new Promise((resolve, reject) => {
        let q = 'select * from usuarios where id = ?';
        db.get().query(q, [id], (err, user) => {
            if (err) reject(err)
            if (user.length != 1) resolve(null)
            resolve(user[0])
        });
    })
}

module.exports = {
    verPerfil: verPerfil
}