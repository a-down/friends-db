import Comment from '../models/Comment';
export const getComments = async (req, res) => {
    try {
    const comments = await Comment.find();
    res.status(200).json(comments);
 } catch (error) {
    res.status(500).json({message: error.message});
    }
}
export const createComment = async (req, res) => {
    try {
		const newComment = new Comment(req.body);
		const savedComment = await newComment.save();
		res.status(200).json(savedComment);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}
export const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const deleteComment = async (req, res) => {
    try {
		const comment = await Comment.findById(req.params.id);
		if(!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}
		await comment.remove();
		res.status(200).json({ message: "Comment removed" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
export const getCommentById = async (req, res) => {
    try {
		const comment = await Comment.findById(req.params.id);
		if(!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}
		res.status(200).json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

