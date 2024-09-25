import axios from 'axios';
import { store } from "../store";
import { ReduxAuthState } from "../store/auth/authSliceTypes.ts";
import { logout, setUserInfo } from "../store/auth/authSlice.ts";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.user?.accessToken;
    const lang = state.lang.lang;

    // config.headers["ngrok-skip-browser-warning"] = "true"
    config.headers["Accept-Language"] = lang;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();
    const refreshToken = state.auth.user?.refreshToken;
    const lang = state.lang.lang;


    if (
      error.response.status === 401 &&
      error.response.data.error.code === "JWT_TOKEN_EXPIRED_OR_INVALID" &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios({
          baseURL: BASE_URL,
          method: "post",
          url: "user/login/access-token",
          data: { refreshToken },
          headers: {
            // "ngrok-skip-browser-warning": "true",
            "Accept-Language": lang
          }
        })
        const dispatch = store.dispatch;
        const currUser = store.getState().auth.user;
        const newAccessToken: string = response.data.data.accessToken;
        if (currUser) {
          const newUserData: ReduxAuthState = { ...currUser, accessToken: newAccessToken }
          dispatch(setUserInfo(newUserData));
        }
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return api(originalRequest);

      } catch (e) {
        const dispatch = store.dispatch;
        dispatch(logout())
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;