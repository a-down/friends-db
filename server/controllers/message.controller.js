const { ObjectId } = require('mongodb');
const { Chat, Message, User } = require('../models')




// Creats new message Obj and then pushes into message array
async function sendMessage(criteria) {
   const { from, to, message } = criteria;
   let messageObj
   try {
      messageObj = new Message({
         from: from,
         to: to,
         message: message
      })
   } catch (err) {
      console.log(err.message)
   }

   try {
      const newMessage = await Chat.create(
         {
            user1: from, user2: to,
            messages: messageObj
         },
      )
      return newMessage
   } catch (err) {
      if (process.env.NODE_ENV === "development") console.log(err)
      throw new Error(err)
   }
};

module.exports = {
   sendMessage,
}