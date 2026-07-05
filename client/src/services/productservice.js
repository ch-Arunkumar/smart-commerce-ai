import axios from "axios";

/*
=========================================================
Product Service
---------------------------------------------------------
This file handles all Product API requests.

Available APIs:
✔ Get All Products
✔ Get Single Product
✔ Add Product
✔ Update Product
✔ Delete Product
=========================================================
*/

// Backend Base URL
const API_URL = "http://localhost:5000/api/products";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// Get all products
// ======================================================

export const getProducts = async () => {
  try {
    const response = await api.get("/");

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);

    throw error;
  }
};

// ======================================================
// Get product by ID
// ======================================================

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/${id}`);

    return response.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);

    throw error;
  }
};

// ======================================================
// Add Product
// ======================================================

export const addProduct = async (productData) => {
  try {
    const response = await api.post("/", productData);

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);

    throw error;
  }
};

// ======================================================
// Update Product
// ======================================================

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(
      `/${id}`,
      productData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);

    throw error;
  }
};

// ======================================================
// Delete Product
// ======================================================

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);

    throw error;
  }
};