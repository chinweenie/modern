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
    console.log('in the server, newFile');
    console.log(newFile);

    newFile.save().then(file => {
        return res.json({
            success: true,
            URL: newFile.URL,
            email: newFile.email
        })
    })
    .catch(err => console.log(err));
});

module.exports = router;