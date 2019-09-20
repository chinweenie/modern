const express = require("express");
const router = express.Router();
const File = require('../models/File');
const cloudinary = require('cloudinary');

router.post('/uploadFile', (req, res) => {
    const newFile = new File({
        URL: req.body.URL,
        user_id: req.body.user_id,
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
            user_id: newFile.user_id
        });
    })
    .catch(err => res.json(err));
});

router.delete('/deleteFile/:user_id/:filename', (req, res) => {
    const user_id = req.params.user_id;
    const filename = req.params.filename;

    File.findOneAndDelete( { user_id: user_id, filename: filename} ).then(file => {
        res.json(file);
        cloudinary.v2.api.delete_resources(file.public_id);
    });
});

router.get('/fetchAll/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    File.find({ user_id }).then(files => (res.json(files)));
});


module.exports = router;