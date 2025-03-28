import mongoose from "mongoose";    



const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log("Database Conneted SuccesFully ......"))
    await mongoose.connect(`${process.env.MONGODB_URL},${process.env.MONGODB_NAME}`)
}
export default connectDB