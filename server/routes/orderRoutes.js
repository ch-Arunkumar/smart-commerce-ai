import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/* ==========================
   GET ALL ORDERS
========================== */

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   CREATE ORDER
========================== */

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      products,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "Please add products.",
      });
    }

    let orderProducts = [];
    let totalAmount = 0;

    for (const item of products) {

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} items left.`,
        });
      }

      product.stock -= item.quantity;

      await product.save();

      orderProducts.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      products: orderProducts,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   UPDATE STATUS
========================== */

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

/* ==========================
   DELETE ORDER
========================== */

router.delete("/:id", async (req, res) => {

  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

export default router;