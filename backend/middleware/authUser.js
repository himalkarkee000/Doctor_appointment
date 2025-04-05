import jwt from 'jsonwebtoken'

//Admin authentication middleware

const authUser = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({
                success:false,
                message:"Not Authorized Login User"
            })
        }    
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

       
    } catch (exception) {
        console.log(exception)
        res.json({
            success:false,
            message:exception.message
        })
        
    }
    
}
export default authUser