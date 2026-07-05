import axios from "axios";

const API = "http://localhost:5000/api/orders";

export const getOrders = () => axios.get(API);

export const createOrder = (data) => axios.post(API, data);

export const updateOrder = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteOrder = (id) =>
  axios.delete(`${API}/${id}`);