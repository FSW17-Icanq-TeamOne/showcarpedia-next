require('dotenv').config()
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY)
}

const verifyToken = async (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
} 