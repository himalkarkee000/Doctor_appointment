import validator from 'validator'
import bcrypt from'bcrypt'
import UserModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
 
//API to register user

const registerUser =async(req,res) =>{
    try {
        const {name , email , password} = req.body

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
        
    } catch (error) {
        
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

export{registerUser ,loginUser,getProfile}