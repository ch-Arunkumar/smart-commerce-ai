import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* =========================
   GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   CREATE PRODUCT
========================= */
router.post("/", async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      category,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   UPDATE PRODUCT
========================= */
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE PRODUCT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;