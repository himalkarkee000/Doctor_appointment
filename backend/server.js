import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

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
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API fgsdfgdfg ")
})

app.listen(port,()=>{
    console.log("Server Started",port)
})