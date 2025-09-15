import { v2 } from "cloudinary";
import fs from "fs";

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
           return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });
        console.log("files uploaded to cloudinary", response.url);
        return response;
        
        // after upload, remove file from local uploads folder
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove file from local uploads folder
        return null;
    }
}

const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);

    export { uploadOnCloudinary };