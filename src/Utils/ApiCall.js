import axios from "axios";
import { baseUrl, token } from "./ApiConfig";

export const CreateAccountApi = (Payload) => {
  // console.log("CreateAccountPayload", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/users/create`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error.response);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

export const ResendVerificationApi = (Payload) => {
  // console.log("CreateAccountPayload", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/users/resend-email`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error.response);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

// const userData = JSON.parse(jsonPayload);


export const CreateAdminApi = (Payload) => {
  console.log("CreateAdminApi", Payload);
  console.log("token", token);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/users/create-admin`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: data,
  };



  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error.response);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

export const ResetPasswordApi = (Payload, Token) => {
  // console.log("CreateAccountPayload", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${baseUrl}/users/reset-password`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error.response);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

export const SignInApi = (Payload) => {
  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log("Response data:", response.data);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data; // Return only response data
    })
    .catch((error) => {
      console.log("Error response:", error.response?.data);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

// Usage: Add the Bearer token for subsequent requests
export const fetchDataWithToken = async () => {
  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/some-protected-endpoint`, config);
    console.log('Data from protected route:', response.data);
  } catch (error) {
    console.error('Error fetching data with token:', error);
  }
};



