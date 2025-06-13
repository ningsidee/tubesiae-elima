const Payment = require("../models/Payment");

const paymentController = {
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPaymentById(req, res) {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createPayment(req, res) {
    try {
      const payment = new Payment(req.body);
      await payment.save();
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updatePayment(req, res) {
    try {
      const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletePayment(req, res) {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      res.json({ message: "Payment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPaymentsByOrderId(req, res) {
    try {
      const payments = await Payment.find({ order_id: req.params.orderId });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
