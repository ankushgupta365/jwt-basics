const express = require('express')
const router = express.Router()
const {login,dashboard} = require('../controllers/main')
const {authMidlleware} = require('../middleware/auth')

//we will add authmidlleware in every protected route where we want to first verify the jwt
router.route('/dashboard').get(authMidlleware,dashboard)
router.route('/login').post(login)

module.exports = router