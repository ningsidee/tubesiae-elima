const User = require("../models/User");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-password_hash");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select("-password_hash");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const userResponse = user.toObject();
      userResponse.id = userResponse._id;
      delete userResponse.password_hash;
      res.status(201).json(userResponse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password_hash");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
