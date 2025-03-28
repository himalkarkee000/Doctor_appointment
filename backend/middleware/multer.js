import multer from'multer'
// import fs from 'fs'
const storage = multer.diskStorage({
    
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
    
   
    
})
const upload = multer({storage})


export default upload

// const multer = require('multer')
// const fs = require('fs')



// export const setPath = (path) =>{
//     return(req,res,next) =>{
//         req.uploadDir = path
//         next()
//     }
// }

// const myStorage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         const path = "./public/uploads/" + req.uploadDir     
//         if(!fs.existsSync(path)){
//             fs.mkdirSync(path, {
//                 recursive:true
//             })
//         }
//         cb(null, path)
//     },
//     filename :(req,file,cb)=>{
//         // const randomNo = Math.ceil(Math.random()*9999)
       
//         const ext = file.originalname.split(".").pop()
//         const filename ="new"+ Date.now()+"-"+"."+ext;
//         cb(null,filename)
//     }
// })

// const imageFilter = (req,file,cb)=>{
//     const ext = file.originalname.split(".").pop()
    
//     const allowed = ['jpg','png','jpeg','svg','webp','gif','bmp']
//     if(allowed.includes(ext.toLowerCase())){
//         cb(null,true)
//     }else{
//         cb({code:400,message:"Image Format not support"})
//     }
// }

// const upload = multer({
//     storage: myStorage,
//     fileFilter:imageFilter,
//     limits:{
//         fileSize:30000000
//     }

// })
// export default upload 


// module.exports = {upload,setPath};

