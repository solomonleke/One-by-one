import axios from "axios";
import { baseUrl,token } from "./ApiConfig";

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
      method: "post",
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
  