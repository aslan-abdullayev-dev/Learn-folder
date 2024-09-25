import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxAuthInitialState, ReduxAuthState } from "./authSliceTypes.ts";

const initialState: ReduxAuthInitialState = {
  user: undefined,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUserInfo: (state, action: PayloadAction<ReduxAuthState>) => {
      return { ...state, user: action.payload };
    },
    logout: () => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
export const { setUserInfo, logout } = authSlice.actions;
