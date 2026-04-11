import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import cartItems from "../../cartItems";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (payload, thunkApi) => {
  // console.log(payload);
  // console.log(thunkApi.getState());
  // thunkApi.dispatch(openModal());
  // ! it is possible to pass payload into getCartItems function
  // ! using thunkApi we can get access to the state of our application
  // ! using thunkApi we can dispatch action from all slices in application

  try {
    const resp = await axios(url);
    return resp.data; // ! will be returned as payload to exraReducer fulfilled
  } catch (err) {
    return thunkApi.rejectWithValue("something went wrong"); // ! value will be passed as action inside exraReducer rejected
  }
});

// ? ================================================================================
// ? TRADITIONAL REDUX
// ? ================================================================================

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "CLEAR_CART": {
//       return { ...state, cartItems: [] }; // ! Can not mutate state, have to return new state
//     }
//   }
// };

// dispatch({ type: "CLEAR_CART", payloda: "" }); // ! Hard to use

// function clearCart(type, payload) {
//   return { type, payload };
// }

// dispatch(clearCart("CLEAR_CART", "some payload")); // ! Easier to use (action creator function)

// ? ================================================================================
// ? END TRADITIONAL REDUX
// ? ================================================================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // action creator function is provided by default
      state.cartItems = [];
      state.amount = 0;

      // dont have to return new state
      // only mutate the needed part of the state
      // return initialState // ! It is possible to return the new state manually
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.amount -= 1;
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += 1;
        total += item.price * item.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
