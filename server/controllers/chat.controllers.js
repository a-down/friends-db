const { Chat } = require('../models');


export const getChats = async (req, res) => {
    try {
    const chats = await Chat.find();
    res.status(200).json({chats});
 } catch (error) {
   res.status(500).json({message: error.message});
 }
}
export const createChat = async (req, res) => {
    const newChat = new Chat({
        ...req.body,
    })
    try {
        const savedChat = await newChat.save()
        res.status(200).json(savedChat)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const deleteChat = async (req, res) => {
    const chat = await Chat.findById(req.params.id);
	if(!chat) {
		return res.status(404).send({ message: 'Chat not found' });
	}
	await chat.remove();
	res.json({ message: 'Chat removed' });
}



