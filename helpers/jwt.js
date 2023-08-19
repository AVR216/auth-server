const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    const payload = {uid, name };

    const token =  jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '24h'
    });

    return token;
}

module.exports = {
    generateJWT
}