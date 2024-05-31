const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name : process.env.cdinary_cloudname,
    api_key:process.env.cdinary_apikey,
    api_secret : process.env.cdinary_secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'gossip',
        allowedFormats: ['jpeg','png','jpg']
    } 
});

module.exports = {
    cloudinary,
    storage
}