const express = require('express');
const router = express.Router();
const {User} = require('../../models');
const ensureAuth = require('../../utils/auth');

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.userIdentifier = newUser.id;
            req.session.username = newUser.username;
            req.session.isLoggedIn = true;
            res.status(201).json({ message: `Account created for ${newUser.username}` });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username }
        });
        
        if (!user) {
            res.status(400).json({ message: "Invalid user credentials." });
            return;
        }

        const isPasswordValid = await user.checkPassword(req.body.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: "Incorrect password." });
            return;
        }

        req.session.save(() => {
            req.session.userIdentifier = user.id;
            req.session.username = user.username;
            req.session.isLoggedIn = true;
            res.status(200).json({ message: "Logged in successfully." });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/logout', ensureAuth, async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            await req.session.destroy();
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(400).end();
    }
});

module.exports = router;
