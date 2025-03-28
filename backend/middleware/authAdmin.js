import jwt from 'jsonwebtoken'

//Admin authentication middleware

const authAdmin = async(req,res,next)=>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({
                success:false,
                message:"Not Authorized Login Admin"
            })
        }    
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                success :false,
                message:"Not Authorized Login Admin"
            })
        }
        next()

       
    } catch (exception) {
        console.log(exception)
        res.json({
            success:false,
            message:exception.message
        })
        
    }
    
}
export default authAdmin