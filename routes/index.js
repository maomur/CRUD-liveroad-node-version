const RegistroModel = require('../models/Registro.model');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const { checkToken, auth } = require('../routes/middlewares');


const express = require('express');
const router = express.Router();

// Ruta Usuario e Index
router.get('/', (req, res) => {
  res.render('index')
})

// Validación Usuario:
router.post('/auth', auth, (req, res) => {
  // console.log('usuario', req.body.username);
  // console.log('constraseña', req.body.pass);
  // console.log('Hola auth res data')
  res.redirect('/data')
})

// Hacer Login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const pass = req.body.pass;
  if (!username || !pass || username != "maomur" || pass != "Alianzar...1") {
    res.redirect('/');
  } else if (username === "maomur" && pass === "Alianzar...1") {
    req.session.username = "maomur";
    req.session.admin = true;
    res.redirect('/data');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

// --->  PETICIONES DE REGISTROS  < -- \\

// GET

// Recuperar Todos los Registros
router.get('/data', auth, async (req, res) => {

  let arrRegistros;

  if (req.query.search) {
    [arrRegistros] = await RegistroModel.getByLoad(req.query.search);
  } else {
    arrRegistros = (await RegistroModel.getAll())[0];
  }

  for (registro of arrRegistros) {
    registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
  }
  res.render('list', {
    registros: arrRegistros
  })
}
)

// Formulario de Registro
router.get('/new', auth, (req, res) => {
  res.render('form');
})

// Ver un Único Registro
router.get('/detail/:registroId', auth, async (req, res) => {

  const [resultado] = await RegistroModel.getById(req.params.registroId);

  const dolar = resultado[0].rate;

  for (registro of resultado) {
    registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
    registro.del = dayjs(registro.del).format('MM-DD-YYYY');
    registro.rate = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dolar)
  }
  res.render('detail', {
    registro: resultado[0]
  })
});

// ELIMINAR UN REGISTRO
router.get('/delete/:registroId', auth, async (req, res) => {
  const [resultado] = await RegistroModel.deleteById(req.params.registroId);
  res.redirect('/data')
});

// EDITAR REGISTRO (CAPTURA DE DATOS DEL FORM)
router.get('/edit/:registroId', auth, async (req, res) => {
  const [resultado] = await RegistroModel.getById(req.params.registroId);
  for (registro of resultado) {
    registro.pu = dayjs(registro.pu).format('YYYY-MM-DD')
    registro.del = dayjs(registro.del).format('YYYY-MM-DD');
  }
  res.render('editForm', {
    registro: resultado[0]
  })
});

//CREAR REGISTRO
router.post('/create', auth, async (req, res) => {
  const [resultado] = await RegistroModel.create(req.body);
  res.redirect('/data')
})

// Actualizar un Registro POST
router.post('/update', auth, async (req, res) => {
  const resultado = await RegistroModel.update(req.body.registroId, req.body);
  res.redirect('/detail/' + req.body.registroId)
})


// --->  PETICIONES DE USUARIOS  < -- \\

// Recuperar un Único Usuario
router.get('/usuario/:usuarioId', auth, async (req, res) => {
  const [resultado] = await RegistroModel.getUser(req.params.usuarioId);
  res.send(resultado)
  //console.log(resultado)
})

// Crear un Usuario
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

// --->  CREACIÓN DE TOKEN  < -- \\
function createToken(usuario) {
  const payload = {
    id: usuario.id,
    username: usuario.username,
    password: usuario.pass
  }

  return jwt.sign(payload, 'alianzared', { expiresIn: '30m' })
};

module.exports = router;
