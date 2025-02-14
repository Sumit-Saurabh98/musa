import axios from "axios";

export const registerUser = async (data: { email: string; password: string }) => {
  const response = await axios.post("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post("/api/auth/login", data);
  return response.data;
};
