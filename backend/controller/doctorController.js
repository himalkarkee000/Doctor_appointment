import DoctorModel from "../model/doctorModel.js"

const changeAvailability =async(req,res)=>{
    try {
        const {docId} = req.body
      

        const docData = await DoctorModel.findById(docId)
        await DoctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({
            success:true,
            message:"Available changed"
        })
    } catch (error) {
        console.log(error)
        res.json({
           
            success:false,
            message:error.message
        })
    }
}
const doctorList = async(req,res)=>{
    try {
        const doctors = await DoctorModel.find({}).select(['-password','-email'])
        res.json({
            success:true,
            doctors
        })
    } catch (error) {
        console.log(error)
   
        
    }
}

export {changeAvailability,doctorList}