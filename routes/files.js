const express = require("express");
const router = express.Router();
const File = require('../models/File');

//after we got the image url to cloudinary, store it in mongoDB

router.post('/uploadFile', (req, res) => {
    const newFile = new File({
        URL: req.body.URL,
        email: req.body.email,
        type: req.body.type,
        name: req.body.name
    });

    newFile.save().then(file => {
        return res.json({
            success: true,
            URL: newFile.URL,
            email: newFile.email
        })
    })
    .catch(err => console.log(err));
});

router.get('/fetchAll/:email', (req, res) => {
    const email = req.params.email;
    File.find({ email }).then(files => (res.json(files)));
});


module.exports = router;