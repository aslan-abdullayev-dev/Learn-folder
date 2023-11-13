import { takeLatest } from "redux-saga/effects";
import {
  API_GET_ORDERS,
  API_SET_NEW_ORDER,
  API_EDIT_ORDER,
} from "../actions/main";
import {
  handleGetOrders,
  handleCreateNewOrder,
  handleEditOrder,
} from "./handlers/orders";

export function* watcherSaga() {
  yield takeLatest(API_GET_ORDERS, handleGetOrders);
  yield takeLatest(API_SET_NEW_ORDER, handleCreateNewOrder);
  yield takeLatest(API_EDIT_ORDER, handleEditOrder);
}
