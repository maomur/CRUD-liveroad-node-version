// REGISTRO DE USUARIOS
const createUser = ({ username, pass }) => {
    return db.query('INSERT INTO liveroad.usuarios (username, pass) VALUES (?, ?)', [username, pass])
}

// LOGIN
const getByUser = (username) => {
    return db.query('SELECT * FROM liveroad.usuarios WHERE username = ?', [username]);
}

module.exports = {
    createUser, getByUser
}