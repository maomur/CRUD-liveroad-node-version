
// const router = require('express').Router();
// const RegistroModel = require('../models/Registro.model');
// const dayjs = require('dayjs');
// const jwt = require('jsonwebtoken');
// const { checkToken } = require('../routes/middlewares')


// //RECUPERAR TODOS LOS REGISTROS
// router.get('/data', checkToken, async (req, res) => {
//     const [arrRegistros] = await RegistroModel.getAll();

//     for (registro of arrRegistros) {
//         registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
//     }

//     res.render('list', {
//         registros: arrRegistros
//     })
// })


// //FORMULARIO DE REGISTRO
// router.get('/new', (req, res) => {
//     res.render('form');
// })


// //VER REGISTRO ÚNICO
// router.get('/detail/:registroId', checkToken, async (req, res) => {
//     try {
//         const [resultado] = await RegistroModel.getById(req.params.registroId);
//         for (registro of resultado) {
//             registro.pu = dayjs(registro.pu).format('MM-DD-YYYY')
//             registro.del = dayjs(registro.del).format('MM-DD-YYYY');
//         }
//         res.render('detail', {
//             registro: resultado[0]
//         })
//     } catch (err) {
//         res.json({ error: err.message })
//     }
// })

// // RECUPERAR REGISTRO POR ID
// router.get('/registros/:registroId', checkToken, async (req, res) => {
//     const [resultado] = await RegistroModel.getById(req.params.registroId);
//     res.send(resultado[0])
// })

// // ELIMINAR  ÚNICO REGISTRO POR ID
// router.get('/delete/:registroId', checkToken, async (req, res) => {
//     const [resultado] = await RegistroModel.deleteById(req.params.registroId);
//     res.redirect('/data')
// });

// // EDITAR REGISTRO
// /*router.get('/edit/:registroId', async (req, res) => {
//     const [resultado] = await RegistroModel.getById(req.params.registroId);
//     res.render('editForm', {
//         registro: resultado[0]
//     })
// });*/

// router.get('/edit/:registroId', (req, res) => {
//     console.log(req.body)
// })

// //CREAR REGISTRO
// router.post('/create', checkToken, async (req, res) => {
//     try {
//         const [resultado] = await RegistroModel.create(req.body);
//         res.redirect('/data')
//     }
//     catch (err) {
//         res.json({ error: err.message })
//     }
// })
// // ACTUALIZAR REGISTRO A PARTIR DE SU ID  ---------------------------------------- PENDIENTE----------
// router.put('/update/:registroId', checkToken, async (req, res) => {
//     const resultado = await RegistroModel.update(req.params.registroId, req.body);
// })

// function createToken(usuario) {
//     const payload = {
//         username: usuario.username,
//         password: usuario.pass
//     }
//     return jwt.sign(payload, 'alianzared', { expiresIn: '10m' })
// }



// module.exports = router;


