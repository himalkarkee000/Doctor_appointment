import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../model/doctorModel.js'
import jwt from 'jsonwebtoken'


//API for adding doctor

const addDoctor = async(req,res,next)=>{
    try {
        const {name , email,available , password,speciality,degree,experience,about,fees} = req.body
        const imageFile = req.file
        let { address } = req.body; 
        
   
      if(!name || !email || !password|| !speciality || !degree || !experience || !about|| !fees|| !address|| !imageFile || !available ===undefined){
        return res.json({
            success:false,
            message:"Missing detail"
        })
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a validate email"
            })
        }
        if(password.length < 8){
            return res.json({
                success:false,
                message:"Please enter a strong password"
            })
        }
        

        //hashed doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)


        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url


        const doctorData ={
            name,
            email,
            image : imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            // :JSON.parse(address)
            address,
            date:Date.now()

        }
      const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor added successfully"})
      
    } catch (exception) {
        console.log(exception)
        res.json({
            success:true,
            message:"Doctors added false"
        })
        
    }

    //API For ADMIN Login
   
}
const loginAdmin = async(req,res,next)=>{
    try {
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({
                success:true,token
            })

        }else{
            res.json({
                success:false,
                message:"Invalid Credential"
            })
        }
        
    } catch (exception) {
        console.log(exception)
        res.json({
            success:true,
            message:exception.message
        })
        
    }
}

//API to get all doctors lists for admin panel

const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success:true,doctors
        })
        
    } catch (exception) {
        console.log(exception)
        res.json({
            success:false,
            message:"Error In showing doctors"
        })
        
    }

}



export {addDoctor,loginAdmin ,allDoctors}