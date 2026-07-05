import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { getAIInsight } from "../services/groqService.js";

const router = express.Router();

router.get("/insight", async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    const data = { products, orders };

    const insight = await getAIInsight(data);

    res.json({ insight });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;