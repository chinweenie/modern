const express = require("express");
const router = express.Router();
const Story = require("../../models/Story");
const validateStoryInput = require('../../validation/story');
const validateResponseInput = require('../../validation/response');
const passport = require("passport");
const serializeStories = require('../serialize_stories');
const serializeStory = require('../serialize_story');

// @route   GET api/stories (index) 
// @desc    Get stories index
// @access  Public
router.get('/', (req, res) => {
    Story
        .find()
        .populate('author')
        .sort({ date: -1 })
        .then(stories => res.json(serializeStories(stories)))
        .catch(error => res.status(404).json({ noStoriesFound: 'No stories found' }));
});

// @route   GET api/stories/:story_id (show) 
// @desc    Get a story 
// @access  Private
router.get('/:story_id', (req, res) => {
    Story
        .findById(req.params.story_id)
        .populate('author')
        .then(story => res.json(serializeStory(story)))
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
    
    const author = req.user.id;
    const title = req.body.title;
    const body = req.body.body;

    const newStory = new Story({ title: title, author: author, body: body, claps: { } });
    newStory.save((err, story) => {
        if (err) console.log(err);
        story.populate('author', (err, storyObj)=> {
            if (err) console.log(err);
            res.json(serializeStory(storyObj))
        })   
    })
    
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
        .populate('author')
        .then(story => res.json(serializeStory(story)))
        .catch(error => res.status(422).json({ cannotUpdateStory: "Cannot update the story" }))
})


// @route   DELETE api/stories/:story_id (delete)
// @desc    Remove a story
// @access  Private
router.delete('/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const story = Story.findById(req.params.story_id);
    story.remove()
        .populate('author')
        .then(story => res.json(serializeStory(story)))
        .catch(error => res.status(404).json({ cannotFindStory: 'Cannot find story with that ID' }))
});


// @route   PUT api/stories/clap/:story_id (put)
// @desc    Add a clap to the story
// @access Private
router.patch('/claps/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Story.findById(req.params.story_id).exec((err, story) => {

        const user_id = req.user.id;
        const claps = story.claps;
        const clap = claps.get(user_id);

        if (clap)
            claps.delete(user_id);
        else 
            claps.set(user_id, true);
        
        Story.update({ _id: req.params.story_id }, { claps: claps }, { multi: true, new: true })
            .then(story => res.json({ total_claps: story.claps.length }))
            .catch(error => res.status(422).json({ cannotUpdateStory: "Cannot update the story" }))
    }); 
    
});


// @route   POST api/stories/responses/:story_id
// @desc    Create new response of a story
// @access  Private
router.post('/responses/:story_id', passport.authenticate('jwt', { session: false }),(req, res) => {
    const { errors, isValid } = validateResponseInput(req.body);

    if (!isValid){
        return res.status(422).json(errors);
    }

    const user = User.findById(req.user.id).exec((err, user) => {
        const story = Story.findById(req.params.story_id).exec((err, story) => {
            const newResponse = {
                user: user.id,
                body: req.body.body
            }

            story.responses.unshift(newResponse);
            story.save().then(story => {
                return res.json(story.responses);
            });
        });
    });
});


// @route   DELETE api/stories/responses/:story_id
// @desc    delete a response of a story
// @access  Private
router.get('/responses/:story_id', (req, res) => {
    const story = Story.findById(req.params.story_id).exec((err, story) => {
            return res.json({responses: story.responses});
    });
});



module.exports = router;