const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        name: req.user.name,
        password: req.user.password,
        email: req.user.email
    });
})

router.post('/register', (req, res) => {
    console.log("register");
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json({
                                success: true,
                                currentUser: { id: user.id, name: user.name }
                            }))
                            .catch(err => console.log(err));
                    })
                });
            }
        });
});

router.post('/login', (req, res) => {
    console.log("login");
    const { errors, isValid } = validateLoginInput(req.body);

    console.log(errors);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    currentUser: { id: user.id, name: user.name }
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})



router.delete('/logout', (req, res) => {
    console.log("out");

    const email = req.body.email;
    User.findOne({ email })
        .then(user => {

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    currentUser: { id: user.id, name: user.name }
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})



module.exports = router;