const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { username, password } = req.body
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password',400)
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate()

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, {
    expiresIn: '30d',
  })
 

  //below line is returning the token
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  console.log(req.users)
  const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({ msg: `Hello ${req.users.username} Welcome!`, secret: `your secret code is ${luckyNumber} and now you can acess it` })
    
}

module.exports = {
    login, dashboard
}