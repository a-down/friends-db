import Message from '../models/Message';
export const getAllMessages = async (req, res) => {
    try {
    const messages = await Message.find();
    res.status(200).json(messages);
 } catch (error) {
    res.status(500).json({message: error.message});
 }}
 export const getMessageById = async (req, res) => {
    try {
    const message = await Message.findById(req.params.id);
    if(!message) {
                return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
 } catch (error) {
    res.status(500).json({message: error.message});
 }}
 export const createMessage = async (req, res) => {
    try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
} catch (error) {
    res.status(500).json({message: error.message});
}}
export const updateMessage = async (req, res) => {
    try {
		const updatedMessage = await Message.findByIdAndUpdate(
			req.params.id,
			{...req.body},
			{ new: true }
		);
		res.status(200).json(updatedMessage);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
export const deleteMessage = async (req, res) => {
    try {
		const message = await Message.findById(req.params.id);
		if(!message) {
			return res.status(404).json({ message: "Message not found" });
		}
		await message.remove();
		res.status(200).json({ message: "Message deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
