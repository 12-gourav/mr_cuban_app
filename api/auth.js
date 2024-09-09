import axios from "axios";

let url = "https://mr-cuban-app-backend.onrender.com/api/v1";

export const LoginApi = async (email, password) => {
  try {
    return await axios.post(`${url}/login/user`, {
      email,
      password,
    },{
      headers:{
        "Content-Type":"application/json",
        }
    });
  } catch (error) {
    console.log(error);
  }
};

export const RegisterApi = async (name, email, phone, password) => {
  try {
    return await axios.post(`${url}/register/user`, {
      name,
      email,
      phone,
      password,
    });
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
};

export const LoadApi = async (token) => {
  try {
    return await axios.get(`${url}/load/user`, {
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error?.response);
  }
};
