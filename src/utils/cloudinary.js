import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload on cloudinary
const uploadOnCloudinary = async(localFilePath) => {
    try{
        // For testing purpose
        // console.log(process.env.CLOUDINARY_CLOUD_NAME)
        // console.log("uploadOncloudinary checked!!!", localFilePath)


        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // after file uploaded successfully
        // console.log("File is uploaded successfully.", response.url)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation done successfully
        return response
    } catch(error) {
        console.log("cloudinary error is: ", error)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    }
}


export { uploadOnCloudinary }