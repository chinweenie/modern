const express = require("express");
const router = express.Router();
const File = require('../models/File');


router.get('/fetchAll/:email', (req, res) => {

    const email = req.params.email;

    File.find({ email })
        .then(files => {
            res.json(
                files
            )
        });
});

module.exports = router;