const { Router } = require('express');
const getRace = require('../controllers/getRace');
const getDogByIdRace = require('../controllers/getDogByIdRace');
const getDogByName = require('../controllers/getDogByName');
const postDog = require('../controllers/postDog');
const getTemperaments = require('../controllers/getTemperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getRace);
router.get('/dogs/:idRace', getDogByIdRace);
router.get('/dogsname', getDogByName);
router.post('/dogs', postDog);
router.get('/temperaments', getTemperaments);



module.exports = router;
