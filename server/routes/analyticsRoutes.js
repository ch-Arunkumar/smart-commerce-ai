import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/* =====================================
   DASHBOARD SUMMARY
===================================== */

router.get("/dashboard-summary", async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const totalOrders = orders.length;

    const totalProducts = products.length;

    const inventoryValue = products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    );

    res.json({
      revenue,
      totalOrders,
      totalProducts,
      inventoryValue,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* =====================================
   MONTHLY SALES
===================================== */

router.get("/monthly-sales", async (req, res) => {

  try {

    const result = await Order.aggregate([

      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }
          },
          revenue: {
            $sum: "$totalAmount"
          },
          orders: {
            $sum: 1
          }
        }
      },

      {
        $sort: {
          "_id.month": 1
        }
      }

    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = result.map((item) => ({
      month: months[item._id.month - 1],
      revenue: item.revenue,
      orders: item.orders,
    }));

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* =====================================
   CATEGORY SALES
===================================== */

router.get("/category-sales", async (req, res) => {

  try {

    const products = await Product.find();

    const map = {};

    products.forEach((product) => {

      const value = product.price * product.stock;

      map[product.category] =
        (map[product.category] || 0) + value;

    });

    const data = Object.keys(map).map((key) => ({
      category: key,
      revenue: map[key],
    }));

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* =====================================
   TOP PRODUCTS
===================================== */

router.get("/top-products", async (req, res) => {

  try {

    const products = await Product.find()
      .sort({ stock: -1 })
      .limit(5);

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

export default router;