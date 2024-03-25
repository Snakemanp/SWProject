const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djwc9jftg',
    api_key: '643637149349899',
    api_secret: '_3rVF94DvszU6qUZWB9BaZknLAc'
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
