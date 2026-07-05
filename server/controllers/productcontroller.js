const Product = require("../models/Product");

// CREATE PRODUCT (supports images + URLs)
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, imageUrls } = req.body;

    // images from upload OR URLs
    const uploadedImages = req.files
      ? req.files.map((file) => file.originalname)
      : [];

    const urls = imageUrls ? JSON.parse(imageUrls) : [];

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images: [...uploadedImages, ...urls],
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = { createProduct, getProducts };