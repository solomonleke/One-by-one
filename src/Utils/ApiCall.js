import axios from "axios";
import { baseUrl } from "./ApiConfig";

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

export const LoginApi = (Payload) => {
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
  