const { Router } = require('express');
const recipes = require("./recipes");
const types = require("./types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(recipes);
router.use(types);


module.exports = router;
