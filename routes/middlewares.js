const jwt = require('jsonwebtoken');
const registroModel = require('../models/Registro.model')

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

module.exports = {
    checkToken
}