let accessToken = "";
let refreshToken = "";
let refreshingToken = false;
let lastResponse = "";

export const setTokens = (newAccessToken, newRefreshToken) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
};

const sendRequest = async (apiUrl, method, requestData, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Lấy token từ đối số hoặc localStorage
  const authToken = token || localStorage.getItem('accessToken');

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
    console.log('Authorization Header:', headers["Authorization"]);
  }

  const options = {
    method,
    headers,
    body: requestData ? JSON.stringify(requestData) : null,
  };

  const response = await fetch(apiUrl, options);
  const responseData = await response.text();

  if (response.ok) {
    lastResponse = responseData; // Cập nhật phản hồi cuối cùng
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
      throw new Error("Forbidden");
    case 404:
      throw new Error("Not Found");
    case 500:
      throw new Error("Server Error");
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
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (!storedRefreshToken) {
      console.error("No refresh token available in localStorage.");
      return false;
    }

    const requestData = { refreshToken: storedRefreshToken };

    console.log(`Sending refresh token request with refreshToken: ${storedRefreshToken}`);
    const response = await sendRequestWithoutToken(apiUrl, "POST", requestData);
    console.log(`Response from refresh token request: ${response}`);

    const jsonResponse = JSON.parse(response);

    if (jsonResponse.tokens) {
      const newAccessToken = jsonResponse.tokens.accessToken;
      const newRefreshToken = jsonResponse.tokens.refreshToken;

      // Cập nhật accessToken và refreshToken
      setTokens(newAccessToken, newRefreshToken);
      console.log(`New accessToken: ${newAccessToken}`);
      console.log(`New refreshToken: ${newRefreshToken}`);

      return true;
    } else {
      console.log("Refresh token response does not contain tokens.");
      return false;
    }
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    if (error.message.includes("Forbidden")) {
      // Handle the forbidden error by forcing a logout or asking the user to re-login
      console.error("Refresh token has expired or is invalid. Please log in again.");
      // Clear stored tokens and redirect to login page if needed
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = "/login"; // Redirect to login page
    }
    return false;
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