import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

/* =======================
   DASHBOARD STATS
======================= */
router.get("/stats", async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, p) => sum + (p.stock || 0),
      0
    );

    const categories = new Set(
      products.map((p) => p.category)
    ).size;

    const lowStock = products.filter(
      (p) => p.stock > 0 && p.stock < 5
    ).length;

    const outOfStock = products.filter(
      (p) => p.stock === 0
    ).length;

    const inventoryValue = products.reduce(
      (sum, p) => sum + (p.price * p.stock),
      0
    );

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalAmount || 0),
      0
    );

    res.json({
      totalProducts,
      totalStock,
      categories,
      lowStock,
      outOfStock,
      inventoryValue,
      totalRevenue,
      totalOrders: orders.length,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =======================
   CATEGORY CHART
======================= */
router.get("/category-chart", async (req, res) => {
  try {
    const products = await Product.find();

    const map = {};

    products.forEach((p) => {
      map[p.category] =
        (map[p.category] || 0) + 1;
    });

    const result = Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/*pie chart*/
router.get("/inventory-pie", async (req, res) => {
  try {
    const products = await Product.find();

    const inStock = products.filter(p => p.stock > 5).length;
    const lowStock = products.filter(
      p => p.stock > 0 && p.stock <= 5
    ).length;
    const outOfStock = products.filter(
      p => p.stock === 0
    ).length;

    res.json([
      { name: "In Stock", value: inStock },
      { name: "Low Stock", value: lowStock },
      { name: "Out of Stock", value: outOfStock }
    ]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
export default router;