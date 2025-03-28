import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:String,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    slots_booked:{
        type:Object,
        default:{}
    }
    
},{
    minimize:false,
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const DoctorModel = mongoose.models.doctor || mongoose.model("doctor",DoctorSchema)
export default DoctorModel