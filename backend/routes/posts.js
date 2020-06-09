const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../model/Post')
const {postValidation} = require('../validation')

//This gets back all the Posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    } catch(err){
        res.json({message: err})
    }
})

//Add new post
router.post('/add', async (req,res)=>{
    //Validate data before add post
    const {error} = postValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Create new user in the database
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        wage: req.body.wage
    })
    try{
        const savedPost = await post.save()
        res.send('Hi, ' + post.name + '! You have successfully added new post.')
    } catch(err){
        res.status(400).send(err)
    }

})


/*
router.get('/', verify, async (req,res) => {
    //Finding the user information by the id we got from the token
    const usr = await User.findOne({_id: req.user._id})
    res.send(usr)
})
*/

router.get('/', verify, async (req,res) => {
    //Finding the user information by the id we got from the token
    res.send('hello')
})

module.exports = router