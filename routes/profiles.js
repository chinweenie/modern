const express = require("express");
const router = express.Router();

router.get('/([\@]):username', (req, res) => {
    res.json({username: req.params.username});
});


module.exports = router; 