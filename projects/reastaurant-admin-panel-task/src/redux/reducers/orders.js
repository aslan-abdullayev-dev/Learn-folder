import { SET_ORDERS, SET_NEW_ORDER, EDIT_ORDER } from "../actions/main";

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;

    case SET_NEW_ORDER:
      const newState = [...state, action.payload];
      return newState;

    case EDIT_ORDER:
      const editedOrderId = action.payload?.id;
      const ordersEditedOrderRemoved = state.filter(
        (order) => order?.id !== editedOrderId
      );
      const newOrders = [...ordersEditedOrderRemoved, action.payload];
      return newOrders;
      return state

    default:
      return state;
  }
}
