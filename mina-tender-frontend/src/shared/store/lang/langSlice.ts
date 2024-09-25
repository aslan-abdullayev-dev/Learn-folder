import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  lang: "az",
};

const langSlice = createSlice({
  initialState,
  name: "lang",
  reducers: {
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    }
  },
});

export default langSlice.reducer;
export const { setLang } = langSlice.actions;
