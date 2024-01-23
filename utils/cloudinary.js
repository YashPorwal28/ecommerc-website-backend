
const cloudinary = require('cloudinary').v2


require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });


module.exports = cloudinary


//   const uploadOnCloudinary = async(localFilePath)=>{
//     try {

//         if(!localFilePath) return null;
//         // upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type : "auto"
//         })

//         // file has been uploadedr successfully


//     } catch (error) {
        
//     }
//   }