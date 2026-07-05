import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

/* =========================
   GEMINI INSIGHTS (MOCK AI LOGIC FIRST)
========================= */

router.get("/insights", async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    const lowStock = products.filter(
      (p) => p.stock > 0 && p.stock < 5
    );

    const topProduct = products.sort(
      (a, b) => b.price - a.price
    )[0];

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalAmount || 0),
      0
    );

    const insights = [
      {
        type: "warning",
        message:
          lowStock.length > 0
            ? `⚠️ ${lowStock.length} products low in stock`
            : "All products are well stocked",
      },
      {
        type: "success",
        message: `💰 Total Revenue: ₹${totalRevenue}`,
      },
      {
        type: "info",
        message: topProduct
          ? `🔥 Top product: ${topProduct.name}`
          : "No products found",
      },
      {
        type: "ai",
        message:
          "🤖 AI Suggestion: Focus on Mobile category — highest demand expected",
      },
    ];

    res.json(insights);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;