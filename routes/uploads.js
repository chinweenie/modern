const express = require("express");
const router = express.Router();
const File = require('../models/File');

router.post('/uploadImage', (req, res) => {
    console.log('in the server, requst and response');
    const newFile = new File({
        URL: req.body.url,
        user_id: "123",
        type: "123",
        name: req.body.name
    });
    newFile.save().then(file => 
        res.json({
        success: true,
        URL: newFile.URL
    }))
    .catch(err => console.log(err));
});

module.exports = router;