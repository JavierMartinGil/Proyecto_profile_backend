const db = require('../db');


const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        let q = 'select * from usuarios where email = ? and password = ?';
        db.get().query(q, [email, password], (err, user) => {
            if (err) reject(err)
            if (user.length != 1) resolve(null)
            resolve(user[0])

        });
    })
}

module.exports = {
    login: login
}