const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
    let user_id;
    let url = req.headers.origin;
    if(url[url.length - 1] === '/')
        url = url.slice(0, -1);

    cloudinary.uploader.upload_stream((result) => {
        user_id = req.body.user_id;
        axios.post(`${url}/uploadFile`, {
                URL: result.secure_url,
                user_id: req.body.user_id,
                filename: req.body.filename,
                public_id: result.public_id,
        })
        .then((response) => {
            res.status(200).json({ success: true, fileURL: result.secure_url, user_id: user_id })
        }).catch((error) => {
            res.status(500).json(error.response.data);
        });
    }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware