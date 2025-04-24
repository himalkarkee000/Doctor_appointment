import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()


//middleware
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors({ 
    origin: '*',
  credentials: true
 }))


// api endpoint

app.get("/user",(req,res)=>{
    res.json({
        result:"HEllo00",
        message:"Fail"
    })
})  

app.use('/api/admin',adminRouter)
//localhost:4000/api/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.use((req,res,next)=>{
    next({code:404,message:"Not found"})
})
app.listen(port,()=>{
    console.log("Server Started",port)
})