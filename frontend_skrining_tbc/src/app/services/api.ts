import axios from "axios"

// Ganti URL ini jika backend Anda berjalan di port atau host yang berbeda
const API_URL = "http://127.0.0.1:5000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api