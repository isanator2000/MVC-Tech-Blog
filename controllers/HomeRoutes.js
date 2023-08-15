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

