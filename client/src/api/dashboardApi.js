import axios from "axios";

const BASE_URL = "http://localhost:5000/api/dashboard";

export const getDashboardStats = () =>
  axios.get(`${BASE_URL}/stats`);

export const getCategoryChart = () =>
  axios.get(`${BASE_URL}/category-chart`);