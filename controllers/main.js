const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
require('dotenv')
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
  //we have passed the returned token from the login route to the dashboard with Bearer + token
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new CustomAPIError('Token not present', 401)
  }

  //to acces the token bcz split returns array 
  const token = authHeader.split(' ')[1]
  try {
    //verify fxn will convert the token and decode it, it will now show our payload and expiration in object form
    const decoded = jwt.verify(token,process.env.JWT_TOKEN)
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${decoded.username} Welcome!`, secret: `your secret code is ${luckyNumber} and now you can acess it` })
  } catch (error) {
    throw new CustomAPIError('You are not authorized to access this route',401)
  }
    
}

module.exports = {
    login, dashboard
}