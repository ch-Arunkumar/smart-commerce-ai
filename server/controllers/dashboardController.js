const Product = require("../models/Product");

// ======================================================
// Dashboard Statistics Controller
// ======================================================

const getDashboardStats = async (req, res) => {
  try {
    // Total number of products in MongoDB
    const totalProducts = await Product.countDocuments();

    // Placeholder values (we'll make these dynamic later)
    const totalOrders = 0;
    const totalCustomers = 0;
    const totalRevenue = 0;

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};

module.exports = {
  getDashboardStats,
};