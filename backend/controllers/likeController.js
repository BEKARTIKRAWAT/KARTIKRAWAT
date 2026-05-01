import Like from "../models/like.js";

export const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching likes" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { projectId } = req.params;
    let project = await Like.findOne({ projectId });
    if (!project) {
      project = await Like.create({ projectId, likes: 1 });
    } else {
      project.likes += 1;
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error updating likes" });
  }
};