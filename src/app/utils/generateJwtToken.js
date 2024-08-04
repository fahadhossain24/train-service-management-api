const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../../config')

const generateJwtToken = async (payload) => {
    const token = await jwt.sign(payload, jwt_secret, {
        expiresIn: "1h"
    })
    return token
}

module.exports = generateJwtToken
