const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoute = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const userTasks = require('./routes/tasks.routes')
const adminRoute = require('./routes/admin.routes')

const app = express()

const port = process.env.PORT || 3000

const conn = mongoose.connect(process.env.MONGO_URI).then(()=>console.log(`MongoDB Connected`)).catch((error)=>console.log(error))

app.use(cors({
    origin: 'http://localhost:5173', // The URL of your frontend
    credentials: true, // Allow cookies to be sent/received
}))
app.use(cookieParser());
app.use(express.json())
app.use('/user', userRoute)
app.use('/tasks', userTasks)
app.use('/admin-dashboard', adminRoute)

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})