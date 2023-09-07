const db = require('../config/connection');
const {Chat, Post, User } = require('../models');
const chatSeeds = require('./chatSeeds.json');
const postSeeds = require('./postSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  await Chat.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});

  await Chat.create(chatSeeds);
  // await Comment.create(commentSeeds);
  // await Message.create(messageSeeds);
  // await Reaction.create(reactionSeeds);
  await Post.create(postSeeds);
  await User.create(userSeeds);

  console.log('It worked!');
  process.exit(0);
});