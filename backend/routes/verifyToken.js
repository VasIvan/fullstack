const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //Check if in the headers request have a token
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied!')

    try{
        // const verified returns the users ID
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch(err){
        res.status(400).send('Invalid Token')
    }
}