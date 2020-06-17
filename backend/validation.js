//Validation JOI
const Joi = require('@hapi/joi')

//Register validation
const registerValidation = data => {
const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1255).required(),
    password2: Joi.string().min(6).max(1255).required()
})

return schema.validate(data)
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1255).required()
    })
    
    return schema.validate(data)
    }

//Post validation
const postValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        phone: Joi.string().min(6).max(255).required(),
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(20).max(255).required(),
        city: Joi.string().min(1).max(255).required(),
        wage: Joi.number().min(1).required()
    })
    
    return schema.validate(data)
    }

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation