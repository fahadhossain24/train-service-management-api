const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config');
const CustomError = require('../errors');

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        throw new CustomError.UnAuthorizedError('Unauthorized access!')
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err)
            throw new CustomError.UnAuthorizedError('Unauthorized access!')
        }
        req.decoded = decoded
        next()
    })

};

module.exports = auth;
