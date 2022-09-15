const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const {UnauthenticationError} = require('../errors')
const authMidlleware = async (req, res, next) => {
    //we have passed the returned token from the login route to the dashboard with Bearer + token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticationError('Token not present')
    }

    //to acces the token bcz split returns array 
    const token = authHeader.split(' ')[1]

    try {
        //verify fxn will convert the token and decode it, it will now show our payload and expiration in object form
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
        const {id,username} = decoded
        req.users= {id,username}

        //by setting object in req we are calling next to run the next route
        next()
      } catch (error) {
        throw new UnauthenticationError('You are not authorized to see this page')
      }
}

module.exports = {authMidlleware}