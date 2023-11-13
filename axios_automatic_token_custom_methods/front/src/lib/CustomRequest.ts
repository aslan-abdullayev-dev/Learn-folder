// apiService.ts

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// type PostErrorResponse = {
//   message: string;
// };

// type PostResponse = {};

// const API_BASE_URL = "https://api.example.com";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
  baseURL: BASE_URL,
});

// Axios GET request example
export const POST = async <SuccessDataType = any, ErrorDataType = any>(
  data: AxiosRequestConfig
): Promise<AxiosResponse<SuccessDataType>> => {
  try {
    const response = await api<SuccessDataType>(data);
    return response;
  } catch (error) {
    throw error as AxiosError<ErrorDataType>;
  }
};

//! =======================================================
//! =======================================================
// axiosInstance.GET = (url = "", callback, errCallBack) => {
//   axiosInstance
//     .get(url)
//     .then(({ data: { data } }) => {
//       if (callback) callback(data);
//     })
//     .catch((err) => {
//       if (errCallBack) errCallBack(err);
//     });
// };

// axiosInstance.POST = (url = "", data, callback, errCallBack) => {
//   axiosInstance
//     .post(url, data)
//     .then(({ data: { data } }) => {
//       if (callback) callback(data);
//     })
//     .catch((err) => {
//       if (errCallBack) errCallBack(err);
//     });
// };
// Add a response interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired token
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Add logic here to refresh your token, e.g., dispatch a Redux action

//       // Example Redux action to refresh token:
//       // await store.dispatch(refreshTokenAction());

//       // After refreshing the token, retry the original request
//       return axiosInstance(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
// ! first level of abstraction finished
// ! maybe abstraction is good when error occurs inside success callback error callback. we can use try catch
// ! add new expected argument to POST method
// ! success callback and error callback
// ! add request and response interceptors
// ? maybe there is no need for abstraction at all.
// ? create an axios instance
// ? add base url
// ? write interceptors
// ? generically handle error inside interceptors
