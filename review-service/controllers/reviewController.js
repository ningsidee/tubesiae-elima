const Review = require("../models/Review");

const reviewController = {
  async getAllReviews(req, res) {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReviewById(req, res) {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createReview(req, res) {
    try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateReview(req, res) {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteReview(req, res) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReviewsByProductId(req, res) {
    try {
      const reviews = await Review.find({ product_id: req.params.productId });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = reviewController;
