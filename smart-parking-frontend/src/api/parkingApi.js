// src/api/parkingApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// fetch all slots
export async function getAllSlots() {
  const res = await API.get("/slots");
  return res.data;
}

// fetch slots by floor
export async function getSlotsByFloor(floor) {
  const res = await API.get(`/slots/${floor}`);
  return res.data;
}

// fetch slots by floor and type
export async function getSlotsByFloorAndType(floor, type) {
  const res = await API.get(`/slots/${floor}/${type}`);
  return res.data;
}

// Book a slot with user name
export async function bookSlot(slotId, userName) {
  const res = await API.post(`/slots/${slotId}/book`, { userName });
  return res.data;
}

// Release a slot
export async function releaseSlot(id) {
  const res = await API.post(`/slots/${id}/release`);
  return res.data;
}

export default API;
