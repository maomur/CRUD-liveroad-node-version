const jwt = require('jsonwebtoken');
const registroModel = require('../models/Registro.model');
const bcrypt = require('bcryptjs');

// --->  MIDDLEWARE CHECKTOKEN  < -- \\

const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {
        //return res.status(401).json({ error: 'Debes incluir la cabecera de autorización' })
        return res.redirect('/')
    }
    const token = req.headers['authorization'];
    let payload;
    try { payload = jwt.verify(token, 'alianzared') } catch (err) { return res.json({ error: 'Token incorrecto o caducado' }) }
    const [usuario] = await registroModel.getUser(payload.id);
    req.usuario = usuario[0];

    next();
}

const comfirmDelete = (req, res, next) => {
    if (req.params.registroId) {
        console.log('Mensaje desde el middle');
        return res.redirect('/data')
    }

    next();
}

const auth = async (req, res, next) => {
    const username = req.session.username;

    if (username) {
        return next();
    } else {
        return res.redirect('/');
    }
}




module.exports = {
    checkToken, auth, comfirmDelete
}