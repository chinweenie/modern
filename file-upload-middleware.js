const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
    let email;
    let url = req.headers.origin;
    if(url[url.length - 1] === '/')
        url = url.slice(0, -1);

    cloudinary.uploader.upload_stream((result) => {
        email = req.body.email;
        axios.post(`${url}/uploadFile`, {
                URL: result.secure_url,
                email: req.body.email,
                filename: req.body.filename,
                etag: result.etag,
                public_id: result.public_id,
                resource_type: result.resource_type,
                signature: result.signature
        })
        .then((response) => {
            res.status(200).json({ success: true, fileURL: result.secure_url, email: email })
        }).catch((error) => {
            res.status(500).json(error.response.data);
        });
    }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware