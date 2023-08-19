const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUser, validateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const verifyToken = require('../middlewares/validar-token');


const router = Router();

/**
 * Crear un nuevo usuario.
 */
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').isLength({ min: 6 }),
    validarCampos
],crearUsuario);

/**
 * LogIn usuario.
 */
router.post('/', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').isLength({ min: 6 }),
    validarCampos
], loginUser);

/**
 * Validar y revalidar token.
 */
router.get('/renew', [
    verifyToken
], validateToken);



module.exports = router;