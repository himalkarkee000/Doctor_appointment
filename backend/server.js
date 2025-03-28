import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//middleware
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())


// api endpoint

app.use('/api/admin',adminRouter)
//localhost:4000/api/add-doctor

app.get('/',(req,res)=>{
    res.send("API fgsdfgdfg ")
})

app.listen(port,()=>{
    console.log("Server Started",port)
})