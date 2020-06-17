const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    phone:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title:{
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    description:{
        type: String,
        required: true,
        min: 20,
        max: 255
    },
    city:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    wage:{
        type: Number,
        required: true,
        min: 1
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema, 'posts')