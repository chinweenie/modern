const express = require("express");
const router = express.Router();
const File = require('../models/File');

router.post('/uploadFile', (req, res) => {
    const newFile = new File({
        URL: req.body.URL,
        email: req.body.email,
        type: req.body.type,
        filename: req.body.filename
    });

    newFile.save().then(file => {
            res.json({
            success: true,
            URL: newFile.URL,
            email: newFile.email
        });
    })
    .catch(err => console.log(err));
});

router.delete('/deleteFile/:email/:filename', (req, res) => {
    const email = req.params.email;
    const filename = req.params.filename;

    File.findOneAndDelete( { email: email, name: filename} ).then(files => {
        console.log(files);
        res.json(files) 
    });
});

router.get('/fetchAll/:email', (req, res) => {
    const email = req.params.email;
    File.find({ email }).then(files => (res.json(files)));
});


module.exports = router;