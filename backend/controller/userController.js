import validator from 'validator'
import bcrypt from'bcrypt'
import UserModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import DoctorModel from '../model/doctorModel.js'
import AppointmentModel from '../model/appointmentModel.js'
 
//API to register user

const registerUser =async(req,res) =>{
    try {
        const {name , email , password} = req.body
        console.log(name,email,password)

        if(!name || !password || !email){
            return res.json({
                success:false,
                message:"Missing Details"
            })

        }
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Enter a valid Email"
            })
        }
        if(password.length<8){
            return res.json({success:false,message:"Enter a Strong Password"})
        }


        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        } 
        
        //save to data base
        const newUser = new UserModel(userData)
        const user = await newUser.save()

        //create a token throw which User can login
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({
            success:true,token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
        
    }
   
}

const loginUser = async(req,res)=>{
    try {
        
        const {email,password} = req.body
        console.log(email,password)
        const user = await UserModel.findOne({email})
        if(!user){
           return res.json({
                success:false,
                message:"User Doesn't exit"
            })

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true , token})
           
        }else{
            res.json({
                success:false,
                message:"Invalid Creanditial"
            })
        }
    } catch (error) {
      
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

//To get the User Profile Data
const getProfile = async(req,res)=>{
    try {
        const{userId} = req.body
        
        const userData = await UserModel.findById(userId).select('-password')
        res.json({success:true, userData})


    } catch (error) {
        
        res.json({
            success:false,
            message:error.message
        })
    }
}
//APi to update user profile
const updateProfile = async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender} =req.body
        const imageFile = req.file
       

        if( !name|| !phone||  !address|| !dob|| !gender){
            return res.json({
                success:false,
                message:"Data missing"
            })
        }

        await UserModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

       if(imageFile){

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageURL = imageUpload.secure_url

        await UserModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        
        res.json({success:true, message:"Profile updated"})
    } catch (error) {
        
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

//Api to book Appointment
const bookAppointment = async (req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime} =req.body
       
        const docData = await DoctorModel.findById(docId).select('-password')
        
        if(!docData.available){
            return res.json({
                success:false,
                message:"Doctor Not available"
            })
        }
        let slots_booked = docData.slots_booked

        //checking for slots availabiltiy
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success:false,
                    message:"Slot Not available"
                })
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] =[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await UserModel.findById(userId).select('-password')
       
        delete docData.slots_booked
        
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotDate,
            slotTime,
            date:Date.now()
        }
        const newAppointment = new AppointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docData
        await DoctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({
            success:true,
            message:"Appointment Booked"
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Api to get user appointments for Frontend my-appointments pages

const listAppointment = async(req,res)=>{
    try {
        
        const {userId} = req.body
        const appointments = await AppointmentModel.find({userId})

        res.json({
            success:true,appointments
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

//Api To cancel the appointment
const cancelAppointment = async(req,res)=>{
    try {
        const {userId , appointmentId} = req.body
        const appointmentData = await AppointmentModel.findById(appointmentId)

        //verify appointment User
        if(appointmentData.userId !== userId){
            return res.json({
                success:false,
                message:"Unauthorised action"
            })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId,{
            cancelled:true
        })
        //Releasing Doctor Slot
        const {docId,slotDate,slotTime} = appointmentData
        const doctorData = await DoctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !==slotTime)
        await DoctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({
            success:true,
            message:"Appointment cancelle"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
        
    }
}
export{registerUser ,loginUser,getProfile,updateProfile ,bookAppointment,listAppointment,cancelAppointment}