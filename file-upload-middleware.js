const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
    let email;
    cloudinary.uploader.upload_stream((result) => {
        email = req.body.email;
        axios.post(`${req.headers.origin}/uploadFile`, {
                // URL: result.url,
                URL: result.secure_url,
                email: req.body.email,
                type: req.body.type,
                name: req.body.name
        })
        .then((response) => {
            // you can handle external API response here
            res.status(200).json({ success: true, fileURL: result.secure_url, email: result.email })
        }).catch((error) => {
            console.log(error)
            res.status(500).json(error.response.data);
        });
    }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware