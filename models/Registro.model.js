const db = require('../config/db').promise();


// --->  HANDLE DE REGISTROS  < -- \\

// Crear Registro
const create = ({ pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid }) => {
    return db.query('INSERT INTO registros (pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid])
}

// Ver Todos los Registros
const getAll = () => {
    return db.query('SELECT * FROM registros');
}

// Recuperar Localidades
const getLoc = () => {
    return db.query('SELECT * FROM locations')
}

// Ver un Único Registro
const getById = (registroId) => {
    return db.query('SELECT * FROM registros WHERE id = ?', [registroId])
}

// Buscar por Load
const getByLoad = (loadnumber) => {
    return db.query('SELECT * FROM registros WHERE loadnumber = ?', [loadnumber])
}

// Editar un Registro
const update = (registroId, { pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid }) => {
    return db.query('UPDATE registros SET pu = ?, del = ?, loadnumber = ?, ocity = ?, dcity = ?, commodity = ?, brokercompany = ?, brokername = ?, brokerphone = ?, phoneextension = ?, rate = ?, truck = ?, paidunpaid = ? WHERE id = ?', [pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid, registroId])
};


// Eliminar un Registro
const deleteById = (registroId) => {
    return db.query('DELETE FROM registros WHERE id = ?', [registroId])
}



// --->  HANDLE DE USUARIOS  < -- \\

// Crear Usuario
const createUser = ({ username, pass }) => {
    return db.query('INSERT INTO usuarios (username, pass) VALUES (?, ?)', [username, pass])
}

// Ver Único Usuario
const getUser = (usuarioId) => {
    return db.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId]);
}

// Login de Usuario
const getByUser = (username) => {
    return db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
}



module.exports = {
    getByLoad, create, deleteById, getAll, getById, update, createUser, getByUser, getUser, getLoc
}