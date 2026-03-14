import api from "../axiosInstance";

/* =========================
   GET VEHICLES
========================= */
export const getVehicles = async () => {
  const res = await api.get("/vehicles");
  return res.data;
};

/* =========================
   CREATE VEHICLE
========================= */
export const createVehicle = async (payload) => {
  const res = await api.post("/vehicles", payload);
  return res.data;
};

/* =========================
   UPDATE VEHICLE
========================= */
export const updateVehicle = async (id, payload) => {
  const res = await api.put(`/vehicles/${id}`, payload);
  return res.data;
};

/* =========================
   DELETE VEHICLE
========================= */
export const deleteVehicle = async (id) => {
  const res = await api.delete(`/vehicles/${id}`);
  return res.data;
};
