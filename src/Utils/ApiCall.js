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


export const GoogleSignInApi = (Payload) => {
  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/auth/google-login`,
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

export const GetAllStudentApi = (pageNo, postPerPage, status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: status === null ? `${baseUrl}/school-admin/all-students?pageNo=${pageNo}&noItems=${postPerPage}` : `${baseUrl}/school-admin/all-students?pageNo=${pageNo}&noItems=${postPerPage}&status=${status}`,
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

export const GetAllSponsorStudentApi = (pageNo, postPerPage) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/sponsor-admin/all-students?pageNo=${pageNo}&noItems=${postPerPage}`,
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


export const GetAllScholarshipStudentsApi = (pageNo, noItems, status, search) => {
 
 
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
export const GetAllBanksApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/payment-handler/all-banks`,
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
export const VerifyBanksApi = (payload) => {
 let data= JSON.stringify(payload)
 
  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseUrl}/payment-handler/resolve-account`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: data
    
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

export const ApproveSchoolApi = async (schoolId, status, note) => {
  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/approve-school/${schoolId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {
      status,
      note
    }
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error(
      error.response?.data?.message || error.message || "Approval failed"
    );
  }
};


export const ApproveStudentApi = (id,payload) => {
 
  let config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/approve-student/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify(payload)
    
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


export const GetSuperAdminDashboardDetailsApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/super-admin/dashboard-metrics`,
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

export const GetSuperAdminFinancialReportsApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/super-admin/financial-metrics`,
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

export const GetPlatformOverviewApi = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/super-admin/platform-overview`,
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

export const GetAdminProfile = () => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/school-admin/admin-profile`,
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

export const GetScholarshipAdminProfileApi = () => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/admin-profile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const GetScholarshipAdminLeaderboardApi = () => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/scholarship-admin/approved-schools-count/true`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const UpdateStudentProfile = async (studentId, updatedFields) => {
  try {
    console.log("Requesting API with fields:", updatedFields);
    const response = await axios.patch(
      `${baseUrl}/school-admin/update-student/${studentId}`,
      updatedFields,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};


export const DeleteStudentProfile = async (student_Id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/school-admin/delete-student/${student_Id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting student profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
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


export const UploadDocumentApi = async (file, name, ownerType, studentEmail = null) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("ownerType", ownerType);
  if (studentEmail) {
    formData.append("studentEmail", studentEmail);
  }
  formData.append("file", file);

 
  console.log("Sending FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await axios.post(
      `${baseUrl}/document-uploader/upload`, 
      formData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(" Upload successful!", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Upload failed:", error.response?.data || error.message);
    throw error;
  }
};

export const GetAdminStat = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/school-admin/admin-profile`,
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

export const GetAdminStats = async () => {
  let config = {
    method: "GET",
    url: `${baseUrl}/school-admin/admin-profile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await axios.request(config);

    console.log("Status Code:", response.status);
    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);

    if (error.response) {
      console.log("Error Response Data:", error.response.data);
      console.log("Error Status Code:", error.response.status);
    }

    throw new Error("Failed to fetch admin stats");
  }
};

export const GetSchoolAdminDashboardGraphDataApi = (status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/school-admin/student-graph-data?status=PENDING`,
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

export const GetStudentStatsApi = () => {
  let config = {
    method: "GET",
    url: `${baseUrl}/school-admin/stats`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error fetching student stats:", error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};

export const GetSponsorAdminStats = async () => {
  let config = {
    method: "GET",
    url: `${baseUrl}/sponsor-admin/metrics`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    console.log("Fetching Sponsor Admin Stats...");
    console.log("Request Config:", config);

    const response = await axios.request(config);

    console.log("Full API Response:", response); // Log entire response

    return response.data.data;
  } catch (error) {
    console.log("Error fetching Sponsor Admin Stats:", error);

    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Request Setup Error:", error.message);
    }

    throw new Error(error.response?.data?.message || error.message);
  }
};


export const fetchSponsorStudents = async () => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/sponsor-admin/all-sponsor-students`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("API Response:", JSON.stringify(response.data, null, 2));

    if (response.status === 200 && response.data?.status === true && Array.isArray(response.data?.data)) {
      return response.data; // ✅ Return full response, not just `data.data`
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error fetching student stats:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const createScholarshipApi = async (formData) => {
  try {
    const config = {
      method: "POST",
      url: `${baseUrl}/sponsor-admin/create-scholarship`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token used in headers, not as a parameter
      },
    };

    const response = await axios.request(config);
    console.log("✅ Scholarship Created:", JSON.stringify(response.data, null, 2));

    if (response.status === 201 && response.data?.status === true) {
      return response.data; // ✅ Return the full response
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("❌ Failed to create scholarship:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getActiveScholarships = async () => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/sponsor-admin/active-scholarship`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token if provided
      },
    };

    const response = await axios.request(config);
    console.log("API Response:", JSON.stringify(response.data, null, 2));

    // Check if response is valid
    if (response.status === 200 && response.data?.status === true && Array.isArray(response.data?.data?.activeScholarship)) {
      return response.data; // ✅ Return full response, including metadata
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("❌ Error fetching active scholarships:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getScholarshipsBySponsor = async () => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/sponsor-admin/all-scholarship`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("✅ Full API Response:", JSON.stringify(response.data, null, 2));

    if (response.status === 200 && response.data?.status === true && Array.isArray(response.data?.data)) {
      console.log("📌 Valid response received: Returning data array"); 
      return response.data;  // ✅ Return full response with `data` as an array
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("❌ Error fetching sponsor scholarships:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

// apiCall.js
export const fundScholarshipApi = async (Id) => {
  console.log("🚀 Funding Scholarship with ID:", Id);

  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/sponsor-admin/fund-scholarship/${Id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.request(config);
    console.log("✅ Funding response data:", response.data);

    if (response.data.status === true) {
      return response.data;
    } else {
      console.error(" Backend returned failure status:", response.data);
      throw new Error(response.data.message || "Could not generate payment link.");
    }

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      console.error(" API call failed - response error:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response received
      console.error(" API call failed - no response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error(" API call setup error:", error.message);
    }
    throw error;
  }
};




export const AddStudentToScholarshipApi = async (scholarshipId, studentIds) => {
  if (!scholarshipId) {
    console.error("❌ scholarshipId is missing!");
    throw new Error("Scholarship ID is required.");
  }

  try {
    const response = await axios.patch(
      `${baseUrl}/sponsor-admin/add-students-to-scholarship/${scholarshipId}`, // ✅ Correctly insert scholarshipId in URL
      { studentIds }, // ✅ Send student IDs in the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Student added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to add student:", error.response?.data || error.message);
    throw error;
  }
};

export const requestFundApi = async ({ studentId, type, amount }) => {
  try {
    const config = {
      method: "POST",
      url: `${baseUrl}/school-admin/request-fund/${studentId}`,
      data: { type, amount },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("✅ Fund Request Sent:", response.data);

    // ✅ Fix: Accept either 200 or 201, and flexible status structure
    if ((response.status === 201 || response.status === 200) && response.data?.message) {
      return response.data;
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("❌ Failed to request fund:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw error
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllFundRequestsApi = async (pageNo, PostPerPage) => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/school-admin/request-fund?pageNo=${pageNo}&noItems=${PostPerPage}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    const requests = response.data?.data?.requestss;

    if (!Array.isArray(requests)) {
      throw new Error("Unexpected response format: 'requestss' is not an array");
    }

    return requests;
  } catch (error) {
    console.error("❌ Failed to fetch fund requests:", error);
    throw error;
  }
};


export const getAllSponsorStudentsApi = async (pageNo, PostPerPage) => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/sponsor-admin/all-students?pageNo=${pageNo}&noItems=${PostPerPage}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("✅ Sponsor Students Retrieved:", response.data);

    // Return just the student list or the full data depending on what you need
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch sponsor students:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const GetAllRequestFundsApi = (pageNo, postPerPage, funded) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/fund-admin/get-all-request-funds?pageNo=${pageNo}&noItems=${postPerPage}&funded=${funded}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Make sure `token` is defined in this scope
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};


export const GetAllFundingHistoryApi = (pageNo, postPerPage) => {
  const config = {
    method: "GET",
    url: `${baseUrl}/fund-admin/get-all-funding-history?pageNo=${pageNo}&noItems=${postPerPage}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => {
      console.log("error", error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown Error");
      }
    });
};

export const GetFundAdminMetricsApi = () => {
  const config = {
    method: "GET",
    url: `${baseUrl}/fund-admin/metrics`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ensure `token` is defined properly
    },
  };
  console.log("Calling metrics API at:", config.url);


  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => {
      console.log("Metrics API error", error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message || "Unknown error");
      }
    });
};


export const GetAllSuperAdminSchoolsApi = (pageNo, noItems, status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/super-admin/all-schools?pageNo=${pageNo}&noItems=${noItems}&status=${status}`,
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

export const GetAllSuperAdminStudentsApi = (pageNo, noItems, status) => {
 
 
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseUrl}/super-admin/all-students?pageNo=${pageNo}&noItems=${noItems}&status=${status}`,
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

export const getAllActiveScholarships = async () => {
  try {
    const config = {
      method: "GET",
      url: `${baseUrl}/super-admin/all-scholarships`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token if provided
      },
    };

    const response = await axios.request(config);
    console.log("getAllActiveScholarships raw response:", response); // Add this

    // Check if response is valid
    if (response.status === 200 && response.data?.status === true && Array.isArray(response.data?.data?.activeScholarship)) {
      return response.data; // ✅ Return full response, including metadata
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("❌ Error fetching active scholarships:", error);

    if (error.response) {
      const { data, status } = error.response;
      console.error(`Server Error [${status}]:`, data);
      throw new Error(data?.message || `Server responded with status ${status}`);
    } else if (error.request) {
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllAdmins = async (adminType, pageNo, postPerPage) => {
  try {
    const response = await axios.get(
      `${baseUrl}/super-admin/user-management`,
      {
        params: {
          type: adminType,
          pageNo: String(pageNo),
          noItems: String(postPerPage),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Server responded with an error");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};




export const initiateFundingApi = async (id, type = "stationery") => {
  console.log("🚀 Initiating funding for ID:", id, "Type:", type);

  try {
    const config = {
      method: 'post',
      url: `${baseUrl}/fund-admin/initiate-funding/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        type
      }
    };

    const response = await axios.request(config);
    console.log("✅ Funding initiated:", response.data);

    if (response.data.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Funding initiation failed.");
    }

  } catch (error) {
    if (error.response) {
      console.error("❌ API response error:", error.response.data);
    } else if (error.request) {
      console.error("❌ No response from API:", error.request);
    } else {
      console.error("❌ API call error:", error.message);
    }
    throw error;
  }
};

export const UpdateSchoolProfile = async (updatedFields) => {
  try {
    console.log("Updating School Profile with fields:", updatedFields);
    const response = await axios.patch(
      `${baseUrl}/users/update-profile`,
      updatedFields,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating school profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const UploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("displayPicture", file);

  const config = {
    method: "PATCH",
    url: `${baseUrl}/document-uploader/upload-profile-picture-school-admin`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // if needed
    },
    data: formData,
  };

  const response = await axios.request(config);
  return response.data; // should return uploaded file URL or success message
};

export const GetScholarshipSchoolProfileApi = async (schoolId) => {
  const config = {
    method: "GET",
    url: `${baseUrl}/scholarship-admin/school-profile/${schoolId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching school profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
export const UpdateBankDetailsApi = async (payload) => {
  let data = JSON.stringify(payload);
  const config = {
    method: "PATCH",
    url: `${baseUrl}/users/update-school-admin`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching school profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const GetScholarshipStudentProfileApi = async (studentId) => {
  const config = {
    method: "GET",
    url: `${baseUrl}/scholarship-admin/student-profile/${studentId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const GetUserProfile = async () => {
  const config = {
    method: "GET",
    url: `${baseUrl}/users/profile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const UploadAdminProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("displayPicture", file);

  const config = {
    method: "POST",
    url: `${baseUrl}/document-uploader/upload-profile-picture`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // if needed
    },
    data: formData,
  };

  const response = await axios.request(config);
  return response.data; // should return uploaded file URL or success message
};
