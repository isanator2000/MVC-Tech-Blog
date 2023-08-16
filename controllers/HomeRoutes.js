const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/config');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({ 
            attributes: ['id', 'title', 'content', 'created_at'],           
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            order: [['created_at', 'DESC']],
        })

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', 
            { posts, 
            loggedIn: req.session.loggedIn, 
            username: req.session.username,
            userId: req.session.userId });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username });
        } else {
            res.status(404).json({ message: "This id has no post."});
        }
    } catch (err) {
        res.status(500).json(err);
    }   
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;