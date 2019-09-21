const express = require("express");
const router = express.Router();
const Story = require("../../models/Story");
const validateStoryInput = require('../../validation/story');
const validateResponseInput = require('../../validation/response')
const passport = require("passport");

// @route   GET api/stories (index) 
// @desc    Get stories index
// @access  Public
router.get('/', (req, res) => {
    Story
        .find()
        .sort({ date: -1 })
        .then(stories => res.json(stories))
        .catch(error => res.status(404).json({ noStoriesFound: 'No stories found' }));
});

// @route   GET api/stories/:story_id (show) 
// @desc    Get a story 
// @access  Private
router.get('/:story_id', (req, res) => {
    Story
        .findById(req.params.story_id)
        .then(story => res.json(story))
        .catch(error => res.status(404).json({ noStoryFound: 'No story found with that ID' }));
});

// @route   POST api/stories (create) 
// @desc    Create a new story 
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateStoryInput(req.body);
    if (!isValid) {
        return res.status(422).json(errors);
    }
    
    const author = User.findById(req.user.id);
    const title = req.body.title;
    const body = req.body.body;

    const newStory = new Story({ title: title, author: author, body: body, claps: { } });
    newStory.save().then(story => {
        res.json(story);
    });
});

// @route   PATCH api/stories/:story_id (update) 
// @desc    Update a story 
// @access  Private
router.patch('/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateStoryInput(req.body);
    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    };
    // const story = Story.findById(req.params.story_id);
    Story.update({ _id: req.params.story_id }, { $set: { title: req.body.title, body: req.body.body } }, { multi: true, new: true })
        .then(story => res.json(story))
        .catch(error => res.status(422).json({ cannotUpdateStory: "Cannot update the story" }))
})


// @route   DELETE api/stories/:story_id (delete)
// @desc    Remove a story
// @access  Private
router.delete('/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const story = Story.findById(req.params.story_id);
    story.remove()
        .then(story => res.json(story))
        .catch(error => res.status(404).json({ cannotFindStory: 'Cannot find story with that ID' }))
});


// @route   PUT api/stories/clap/:story_id (put)
// @desc    Add a clap to the story
// @access Private
router.patch('/claps/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Story.findById(req.params.story_id).exec(function (err, story) {

        const user_id = req.user.id;
        const claps = story.claps;
        const clap = claps.get(user_id);

        if (clap) 
            claps.delete(user_id);
        else 
            claps.set(user_id, true);
        
        Story.update({ _id: req.params.story_id }, { claps: claps }, { multi: true, new: true })
            .then(story => res.json(story))
            .catch(error => res.status(422).json({ cannotUpdateStory: "Cannot update the story" }))
    }); 
    
});


// @route   POST api/stories/responses/:story_id
// @desc    Create new response of a story
// @access  Private
router.post('/responses/:story_id',
            passport.authenticate('jwt', { session: false }),
            (req, res) => {

            });


module.exports = router;