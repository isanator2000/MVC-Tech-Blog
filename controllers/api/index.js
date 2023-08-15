const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const postRoutes = require('./PostRoutes');
const commentRoutes = require('./CommentRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);



module.exports = router;