const route = require('express').Router()
const authController = require('../controllers/authController')
const { emailToLowerCase } = require('../middleware')


route.use(emailToLowerCase)

route.post('/register', authController.register)
route.post('/login', authController.login)

module.exports = route
