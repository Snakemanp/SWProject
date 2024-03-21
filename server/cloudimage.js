const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djwc9jftg',
    api_key: '643637149349899',
    api_secret: '_3rVF94DvszU6qUZWB9BaZknLAc'
});

module.exports={
    cloudinary,
}