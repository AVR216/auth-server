const { request, response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body;

    try {
        //Verificar que no exista el correo
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Electronic mail is already in use.'
            });
        }
        //Crear usuario con el modelo
        const dbUser = new User(req.body);
        //Encriptar la constraseña
        const salt = await bcrypt.genSalt(10);
        dbUser.password = await bcrypt.hash(password, salt);
        //Generar el jwt
        const token = await generateJWT(dbUser.id, name);
        //Crear usuario en DB
        await dbUser.save();
        //Generar la respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email: dbUser.email,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'A server problem has occurred'
        });
    }
}

const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const dbUser = await User.findOne({ email });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong e-mail'
            });
        }
        //Confirm password
        const validPassword = await bcrypt.compare(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            });
        }
        //Generar jwt
        const token = await generateJWT(dbUser.id, dbUser.name);
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'A server problem has occurred'
        });
    }
}

const validateToken = async (req = request, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT( uid, name );
    const user = await User.findById( uid );
    return res.status(200).json({
        ok: true,
        uid,
        name,
        email: user.email,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUser,
    validateToken
}