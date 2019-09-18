const express = require("express");
const router = express.Router();

router.post('/uploadImage', (req, res) => {
    console.log('in the server, requst and response')
    console.log(req.body)
    res.json({
        somevalue: "hi"
    });
});

module.exports = router;