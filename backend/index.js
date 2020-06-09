const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

//MongoDB connection
mongoose.connect(process.env.DB_CONN,{ useUnifiedTopology: true, useNewUrlParser: true  }, () => console.log('Successfully connected to MongoDB'))


//Route Middlewares
//CORS
app.use(cors())
//body-parser
app.use(express.json())
//This middleware help use with the auth.js file that automaticly add /api/user to the www.localhost:3000/api/user/ so we don't have to every time write it manually when is all the time the same routejust the last part is changed, so we write only the last part of the route
app.use('/api/user', authRoute)
//This middleware www.localhost:3000/api/posts/ 
app.use('/api/posts', postRoute)

app.listen(5000, () => console.log('server running on port 5000'))