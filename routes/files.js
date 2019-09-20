const express = require("express");
const router = express.Router();
const File = require('../models/File');
const cloudinary = require('cloudinary');

router.post('/uploadFile', (req, res) => {
    const newFile = new File({
        URL: req.body.URL,
        email: req.body.email,
        filename: req.body.filename,
        etag: req.body.etag,
        public_id: req.body.public_id,
        resource_type: req.body.resource_type,
        signature: req.body.signature
    });
    newFile.save().then(file => {
            res.json({
            success: true,
            URL: newFile.URL,
            email: newFile.email
        });
    })
    .catch(err => res.json(err));
});

router.delete('/deleteFile/:email/:filename', (req, res) => {
    const email = req.params.email;
    const filename = req.params.filename;

    File.findOneAndDelete( { email: email, filename: filename} ).then(file => {
        res.json(file);
        cloudinary.v2.api.delete_resources(file.public_id);
    });
});

router.get('/fetchAll/:email', (req, res) => {
    const email = req.params.email;
    File.find({ email }).then(files => (res.json(files)));
});


module.exports = router;