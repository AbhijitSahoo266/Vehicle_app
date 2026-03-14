import api from "../axiosInstance";

export const getDrivers = async () => {
  const res = await api.get("/drivers");
  return res.data;
};