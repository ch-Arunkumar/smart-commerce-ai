import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

/**
 * GET ALL PRODUCTS
 */
export const getProducts = () => axios.get(BASE_URL);

/**
 * CREATE PRODUCT
 */
export const createProduct = (data) => axios.post(BASE_URL, data);

/**
 * UPDATE PRODUCT
 */
export const updateProduct = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

/**
 * DELETE PRODUCT
 */
export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`);