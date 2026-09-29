import instance from "./axiosInstance";

export const signup = async (data) => {
  const result = await instance.post("/users/signup", data);
  return result.data;
};

export const login = async (data) => {
  const result = await instance.post("/users/login", data);
  return result.data;
};

export const logout = async () => {
  const result = await instance.get("/users/logout");
  return result.data;
};

export const getCurrentUser = async () => {
  const result = await instance.get("/users/current");
  return result.data;
};

export const getActivationKey = async (email) => {
  const result = await instance.get(`/users/key/${email}`);
  return result.data;
};

export const getKeyVerify = async (key) => {
  const result = await instance.get(`/users/verify/${key}`);
  return result.data;
};

export const saveNewPassword = async (data) => {
  const result = await instance.patch(`/users/password`, data);
  return result.data;
};

export const getCalorieIntake = async (payload) => {
  const result = await instance.post(`/daily-intake`, payload);
  return result.data;
};

export const getCalorieIntakeForUser = async (payload) => {
  const result = await instance.post(`/daily-intake/user`, payload);
  return result.data;
};

export default instance;
