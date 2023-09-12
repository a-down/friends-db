const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const chatRoutes = require('./chat.routes');
const postRoutes = require('./post.routes');
const commentRoutes = require('./comment.routes');
const friendRoutes = require('./friend.routes');
const messageRoutes = require('./message.routes');



router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/friend', friendRoutes);
router.use('/message', messageRoutes);



module.exports = router;
