import api from "../axiosInstance";

export const getTrips = async () => {
  const res = await api.get("/trips");
  return res.data;
};

export const createTrip = async (data) => {
  const res = await api.post("/trips", data);
  return res.data;
};

export const updateTrip = async (id, data) => {
  const res = await api.put(`/trips/${id}`, data);
  return res.data;
};

export const deleteTrip = async (id) => {
  const res = await api.delete(`/trips/${id}`);
  return res.data;
};
