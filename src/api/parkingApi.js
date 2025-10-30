// src/api/parkingApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// fetch all slots and frontend will filter by floor/type
export async function getAllSlots() {
  const res = await API.get("/slots");
  return res.data;
}

export async function reserveSlot(id) {
  const res = await API.post(`/slots/${id}/reserve`);
  return res.data;
}

export async function releaseSlot(id) {
  const res = await API.post(`/slots/${id}/release`);
  return res.data;
}

export default API;
