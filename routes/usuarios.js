const router = require('express').Router();

const RegistroModel = require('../models/Registro.model');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')


// CREAR USUARIO
router.post('/createUser',
    body('username', 'Username is require').exists(), body('pass').isLength({ min: 3, max: 12 }).withMessage('Password between 3 and 12 characters'), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }
        req.body.pass = bcrypt.hashSync(req.body.pass, 11);

        const resultado = await RegistroModel.createUser(req.body);
        res.redirect('/data');
    })

// LOGIN 
router.post('/login', async (req, res) => {
    const [resultado] = await RegistroModel.getByUser(req.body.username);
    if (resultado.length === 0) {
        return res.json({ error: 'Error en usuario y/o contraseña' })
    }

    const usuario = resultado[0];
    const iguales = bcrypt.compareSync(req.body.pass, usuario.pass);

    if (iguales) {
        res.json({ success: 'Login correcto', token: createToken(usuario) })
    } else {
        console.log('No login')
        res.json({ error: 'Error en email y/o contraseña' })
    }
})

module.exports = router;