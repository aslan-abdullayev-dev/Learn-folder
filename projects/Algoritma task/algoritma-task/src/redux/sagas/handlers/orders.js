import { call, put } from "redux-saga/effects";
import { getOrders, createNewOrder, editOrder } from "../requests/orders";
import { SET_ORDERS, SET_NEW_ORDER, EDIT_ORDER } from "../../actions/main";

export function* handleGetOrders() {
  try {
    const response = yield call(getOrders);
    const { data } = response;
    yield put({ type: SET_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateNewOrder(action) {
  try {
    const response = yield call(() => createNewOrder(action.payload));
    const { data } = response;
    yield put({ type: SET_NEW_ORDER, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditOrder(action) {
  try {
    const response = yield call(() => editOrder(action.payload));
    const { data } = response;
    yield put({ type: EDIT_ORDER, payload: data });
  } catch (error) {
    console.log(error);
  }
}
