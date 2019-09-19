const express = require("express");
const router = express.Router();
const Story = require("../../models/Story");
const validateStoryInput = require('../../validation/story');
const passport = require("passport");

// @route   GET api/stories (index) 
// @desc    Get stories index
// @access  Public
router.get('/', (req, res) => {
    Story
        .find()
        .sort({date: -1})
        .catch(error => res.status(404).json({noStoriesFound: 'No stories found'}));
});

// @route   GET api/stories/:story_id (show) 
// @desc    Get a story 
// @access  Private
router.get('/:story_id', (req, res) => {
    Story
        .findById(req.params.story_id)
        .then(story => res.json(story))
        .catch(error => res.status(404).json({noStoryFound: 'No story found with that ID'}));
});

// @route   POST api/stories (create) 
// @desc    Create a new story 
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body);
    const {errors, isValid} = validateStoryInput(req.body);
    if (!isValid) {
        return res
            .status(422)
            .json(errors);
    };

    const user = User.findById(req.user.id);
    const title = req.body.title;
    const body = req.body.body;

    const newStory = new Story({title: req.body.title, author: req.user.id, body: req.body.body})

    newStory
        .save()
        .then(story => res.json(story));
});

// @route   PATCH api/stories/:story_id (update) 
// @desc    Update a story 
// @access  Private
router.patch('/:story_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateStoryInput(req.body);
    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    };
    
    // const story = Story.findById(req.params.story_id);
    Story.update({_id: req.params.story_id}, {$set: {title: req.body.title, body: req.body.body}}, {multi: true, new: true})
        .then(story => res.json(story))
        .catch(error => res.status(422).json({ cannotUpdateStory: "Cannot update the story"})) 
})


// @route   DELETE api/stories/:story_id (delete)
// @desc    Remove a story
// @access  Private
router.delete('/:story_id',
              passport.authenticate('jwt', { session: false }),
              (req, res) => {

                const story = Story.findById(req.params.story_id);
                
                story.remove()
                     .then(story => res.json(story))
                     .catch(error => res.status(404).json({ cannotFindStory: 'Cannot find story with that ID'}))
              });

module.exports = router;
