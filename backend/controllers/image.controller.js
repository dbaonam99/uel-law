const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports.post = async function(req, res) {    
    try {
        const fileStr = req.file.path;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: "Law",
        }); 
        await unlinkAsync(req.file.path) 
        res.json({
            "success" : 1,
            "file": {
                "url" : uploadResponse.url
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}   