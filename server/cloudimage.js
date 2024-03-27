const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDIANRY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadimg(file) {
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            folder: 'sweproject',
            resource_type: 'auto' // Automatically determine the type of file
        });
        
        // Return the URL of the uploaded image
        console.log(result);
        return result.url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}

module.exports = {
    uploadimg,
};
