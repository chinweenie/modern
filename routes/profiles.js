const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const passport = require("passport");

router.get('/([\@]):username', (req, res) => {
    res.json({username: req.params.username, message: "I'm readty to work!"});
});

// @route   GET api/stories (index) 
// @desc    Get stories index
// @access  Public
router.get('/([\@]):username/stories/:author', (req, res) => {
    Story
        .find( { author: req.params.author })
        .sort({ date: -1 })
        .then(response => res.json(response))
        .catch(error => res.status(422).json({ noStoriesFound: 'No stories found' }));
});


module.exports = router; 