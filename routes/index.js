const express = require('express');
const router = express.Router();
const RegistroModel = require('../models/Registro.model');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const { checkToken } = require('../routes/middlewares');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index')
});

// --->  PETICIONES DE REGISTROS  < -- \\

// GET

// Recuperar Todos los Registros
router.get('/data', async (req, res) => {

  try {
    const [arrRegistros] = await RegistroModel.getAll();

    for (registro of arrRegistros) {
      registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
    }

    res.render('list', {
      registros: arrRegistros
    })
  } catch (error) { console.log(error) }

}
)


// Formulario de Registro
router.get('/new', (req, res) => {
  res.render('form');
})

//Buscar por Load
router.get('/:registroId', async (req, res) => {
  const [resultado] = await RegistroModel.getByLoad(req.params.registroId);
})

// Ver un Único Registro
router.get('/detail/:registroId', async (req, res) => {
  try {
    const [resultado] = await RegistroModel.getById(req.params.registroId);
    for (registro of resultado) {
      registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
      registro.del = dayjs(registro.del).format('MM-DD-YYYY');
    }
    res.render('detail', {
      registro: resultado[0]
    })
  } catch (err) {
    res.json({ error: err.message })
  }
});


// ELIMINAR UN REGISTRO
router.get('/delete/:registroId', async (req, res) => {
  const [resultado] = await RegistroModel.deleteById(req.params.registroId);
  res.redirect('/data')
});


// EDITAR REGISTRO (CAPTURA DE DATOS DEL FORM)
router.get('/edit/:registroId', async (req, res) => {
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
router.post('/create', async (req, res) => {
  const [resultado] = await RegistroModel.create(req.body);
  res.redirect('/data')
})

// Actualizar un Registro POST
router.post('/update', async (req, res) => {
  const resultado = await RegistroModel.update(req.body.registroId, req.body);
  res.redirect('/detail/' + req.body.registroId)
})



// --->  PETICIONES DE USUARIOS  < -- \\

// Recuperar un Único Usuario
router.get('/usuario/:usuarioId', async (req, res) => {
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

// Login de Usuario 
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
