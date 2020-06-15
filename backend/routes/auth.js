const router = require('express').Router()
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//This gets back all the Users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.json({message: err})
    }
})
//Register user
router.post('/register', async (req,res)=>{

    //Validate data before creating user / from the validation file we take registerValidation and if some of the Joi conditions are not covered returns an error
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //Check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists!')

    //Check if the passwords are not matching
    if(req.body.password != req.body.password2) return res.status(400).send('Passwords does not match!')

    //Hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    //Create new user in the database
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save()
        //res.send({user: user.name})
        res.send('Successfully registered new user: ' + user.name)
    } catch(err){
        res.status(400).send(err)
    }

})

//Login user
router.post('/login', async (req, res) => {
    //Validate data before login user
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the user is already in the database
    const userEmail = await User.findOne({email: req.body.email})
    if(!userEmail) return res.status(400).send('Email does not exist!')

    //Check is the password correct
    const validPass = await bcrypt.compare(req.body.password, userEmail.password)
    if(!validPass) return res.status(400).send('Password not right!')

    //Create and assign token
    const token = jwt.sign({email: userEmail.email, name: userEmail.name}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({email: userEmail.email, name: userEmail.name, token: token})
})

module.exports = router