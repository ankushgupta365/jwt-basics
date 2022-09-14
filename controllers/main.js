const login = async(req,res)=>{
    const {username,password} = req.body
    console.log(username,password,req.body)
    res.status(200).send('You are now on login page')
}

const dashboard = async(req,res)=>{
    res.status(200).send('You are on dashboard')
}

module.exports = {
    login,dashboard
}