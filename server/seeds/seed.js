const db = require('../config/connection');
const {Chat, Comment, Message, Post, User } = require('../models');
const chatSeeds = require('./chatSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const postSeeds = require('./postSeeds.json');
const reactionSeeds = require('./reactionSeeds.json');
const userSeeds = require('./userSeeds.json');



db.once('open', async () => {
  await Chat.create(chatSeeds);
  await Comment.create(commentSeeds);
  await Message.create(messageSeeds);
  await Post.create(postSeeds);
  await Reaction.create(reactionSeeds);
  await User.create(userSeeds);

  console.log('It worked!');
  process.exit(0);
});