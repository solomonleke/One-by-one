import axios from "axios";
import { baseUrl, token } from "./ApiConfig";
import { useParams } from "react-router-dom";



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

export const CreateStudentApi = (Payload) => {

  console.log("CreateStudentAPI~Payload", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/school-admin/register-student`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
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
  // console.log("ResendVerificationApi", Payload);

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


export const CreateAdminApi = (Payload,tempToken) => {
  console.log("CreateAdminApi", Payload);
  

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/users/create-admin`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tempToken}`
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
  // console.log("ResetPasswordApi", Payload);

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

export const GetAllStudentApi = (pageNo, postPerPage) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/school-admin/all-students?pageNo=${pageNo}&noItems=${postPerPage}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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


export const GetAllScholarshipStudentsApi = (pageNo, noItems, status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/all-students?pageNo=${pageNo}&noItems=${noItems}&status=${status}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const GetAllScholarshipSchoolsApi = (pageNo, noItems, status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/get-all-schools?pageNo=${pageNo}&noItems=${noItems}&status=${status}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const ApproveSchoolApi = (status, note) => {
  const { schoolId } = useParams();
 
  let config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/approve-school/${schoolId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const ApproveStudentApi = (status, essayPercentage) => {
  const { student_id } = useParams();
 
  let config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/approve-school/${student_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const GetScholarshipDashboardDetailsApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/dashboard`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const GetScholarshipDashboardGraphDataApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/graph-data`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    
  };

  return axios
    .request(config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      console.log("error", error);
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

export const GetStudentProfile = async (student_Id) => {
  try {
    const response = await axios.get(
      `${baseUrl}/school-admin/student-profile/${student_Id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};



