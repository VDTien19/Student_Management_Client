// let accessToken = "";
// let refreshToken = "";

// export const setTokens = (newAccessToken, newRefreshToken) => {
//   accessToken = newAccessToken;
//   refreshToken = newRefreshToken;
// };

// const sendRequest = async (url, method, data) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${accessToken}`,
//   };

//   const options = {
//     method,
//     headers,
//     body: data ? JSON.stringify(data) : null,
//   };

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     // Handle unauthorized and refresh token
//     if (response.status === 401) {
//       await refreshAccessToken();
//       return sendRequest(url, method, data);
//     }
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   return response.json();
// };

// const refreshAccessToken = async () => {
//   // Logic to refresh the token
//   const response = await fetch('http://localhost:8080/api/auth/refresh', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ refreshToken }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to refresh token');
//   }

//   const data = await response.json();
//   setTokens(data.accessToken, data.refreshToken);
// };

// export const get = (url) => sendRequest(url, 'GET');
// export const post = (url, data) => sendRequest(url, 'POST', data);
// export const put = (url, data) => sendRequest(url, 'PUT', data);
// export const del = (url) => sendRequest(url, 'DELETE');


let accessToken = "";
let refreshToken = "";
let refreshingToken = false;
let lastResponse = "";

export const setTokens = (newAccessToken, newRefreshToken) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
};

const sendRequest = async (apiUrl, method, requestData, token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: requestData ? JSON.stringify(requestData) : null,
  };

  const response = await fetch(apiUrl, options);
  const responseData = await response.text();
  
  if (response.ok) {
    lastResponse = responseData; // Update the last response
    return responseData;
  } else {
    handleErrorResponse(response, responseData);
  }
};

const handleErrorResponse = (response, errorResponse) => {
  switch (response.status) {
    case 401:
      throw new Error("Unauthorized");
    case 400:
      throw new Error(errorResponse);
    case 403:
      throw new Error(errorResponse);
    case 404:
      throw new Error(errorResponse);
    case 500:
      throw new Error(errorResponse);
    default:
      throw new Error(`Failed: HTTP error code: ${response.status} - ${response.statusText} - ${errorResponse}`);
  }
};

export const getLastResponse = () => {
  return lastResponse;
};

const sendRequestWithoutToken = async (apiUrl, method, requestData) => {
  return await sendRequest(apiUrl, method, requestData, null);
};

const refreshAccessToken = async () => {
  if (refreshingToken) {
    return false;
  }

  refreshingToken = true;
  try {
    const apiUrl = "http://localhost:8080/api/auth/refresh";
    const requestData = { refreshToken };

    console.log(`Sending refresh token request with refreshToken: ${refreshToken}`);
    const response = await sendRequestWithoutToken(apiUrl, "POST", requestData);
    console.log(`Response from refresh token request: ${response}`);

    const jsonResponse = JSON.parse(response);

    if (jsonResponse.tokens) {
      const newAccessToken = jsonResponse.tokens.accessToken;
      const newRefreshToken = jsonResponse.tokens.refreshToken;

      // Update accessToken and refreshToken
      setTokens(newAccessToken, newRefreshToken);
      console.log(`New accessToken: ${newAccessToken}`);
      console.log(`New refreshToken: ${newRefreshToken}`);

      return true;
    } else {
      console.log("Refresh token response does not contain tokens.");
      return false;
    }
  } finally {
    refreshingToken = false;
  }
};

export const sendRequestWithRefresh = async (apiUrl, method, requestData) => {
  try {
    return await sendRequest(apiUrl, method, requestData, accessToken);
  } catch (error) {
    if (error.message === "Unauthorized" && await refreshAccessToken()) {
      return await sendRequest(apiUrl, method, requestData, accessToken);
    } else {
      throw new Error("Failed to refresh token.");
    }
  }
};

export const sendGet = async (apiUrl) => {
  return await sendRequestWithRefresh(apiUrl, "GET", null);
};

export const sendPost = async (apiUrl, requestData) => {
  try {
    return await sendRequestWithRefresh(apiUrl, "POST", requestData);
  } catch (error) {
    return error.message;
  }
};

export const sendPut = async (apiUrl, requestData) => {
  try {
    return await sendRequestWithRefresh(apiUrl, "PUT", requestData);
  } catch (error) {
    throw new Error(`PUT request failed: ${error.message}`);
  }
};

export const sendDelete = async (apiUrl) => {
  try {
    return await sendRequestWithRefresh(apiUrl, "DELETE", null);
  } catch (error) {
    throw new Error(`DELETE request failed: ${error.message}`);
  }
};
