// --->  HANDLE DE REGISTROS  < -- \\

// Crear Registro
const create = ({ pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid }) => {
    return db.query('INSERT INTO liveroad.registros (pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid])
}

// Ver Todos los Registros
const getAll = () => {
    return db.query('SELECT * FROM liveroad.registros')
}

// Ver un Único Registro
const getById = (registroId) => {
    return db.query('SELECT * FROM liveroad.registros WHERE id = ?', [registroId])
}


// Editar un Registro
const update = (registroId, { pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid }) => {
    return db.query('UPDATE registros SET pu = ?, del = ?, loadnumber = ?, ocity = ?, dcity = ?, commodity = ?, brokercompany = ?, brokername = ?, brokerphone = ?, phoneextension = ?, rate = ?, truck = ?, paidunpaid = ? WHERE id = ?', [pu, del, loadnumber, ocity, dcity, commodity, brokercompany, brokername, brokerphone, phoneextension, rate, truck, paidunpaid, registroId])
};


// Eliminar un Registro
const deleteById = (registroId) => {
    return db.query('DELETE FROM liveroad.registros WHERE id = ?', [registroId])
}



// --->  HANDLE DE USUARIOS  < -- \\

// Crear Usuario
const createUser = ({ username, pass }) => {
    return db.query('INSERT INTO liveroad.usuarios (username, pass) VALUES (?, ?)', [username, pass])
}

// Ver Único Usuario
const getUser = (usuarioId) => {
    return db.query('SELECT * FROM liveroad.usuarios WHERE id = ?', [usuarioId]);
}

// Login de Usuario
const getByUser = (username) => {
    return db.query('SELECT * FROM liveroad.usuarios WHERE username = ?', [username]);
}



module.exports = {
    create, deleteById, getAll, getById, update, createUser, getByUser, getUser
}