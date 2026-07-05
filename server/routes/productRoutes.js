import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ==========================
   GET ALL PRODUCTS
========================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   ADD PRODUCT
========================== */
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   UPDATE PRODUCT
========================== */
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   DELETE PRODUCT
========================== */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   IMAGE UPLOAD
========================== */
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const image = req.file;

    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

    res.json({
      success: true,
      imageUrl: base64Image,
    });
  } catch (err) {
    res.status(500).json({
      error: "Upload failed",
    });
  }
});

export default router;