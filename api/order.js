import axios from "axios";

let url = "https://mr-cuban-app-backend.onrender.com/api/v1";

export const CreateOrder = async (
  pickup,
  drop,
  returnPickup,
  returnDrop,
  pickdate,
  dropdate,
  type,
  id,
  otp
) => {
  try {
    return await axios.post(
      `${url}/create/lead`,
      {
        pickup,
        drop,
        type,
        returnPickup,
        returnDrop,
        pickdate,
        dropdate,
        id,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchOrders = async (id, token) => {
  try {
    return await axios.get(`${url}/get/lead`, {
      params: {
        id: id,
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error?.response);
  }
};

export const CancelOrderAPI = async (id) => {
  try {
    return await axios.get(`${url}/cancel/lead/customer`, {
      params:{
        id
      },
      
    });
  } catch (error) {
    console.log(error?.response);
  }
};




export const AcceptOrderAPI = async (id) => {
  try {
    return await axios.get(`${url}/cancel/lead/customer`, {
      params:{
        id
      },
      
    });
  } catch (error) {
    console.log(error?.response);
  }
};