import axios from "axios";

const baseURL = process.env.REACT_APP_JSON_URL;

export function getOrders() {
  return axios.request({
    baseURL,
    url: `orders`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createNewOrder(newOrderBody) {
  return axios.request({
    baseURL,
    url: `orders`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: newOrderBody,
  });
}

export function editOrder(editedOrderBody) {
  return axios.request({
    baseURL,
    url: `orders/${editedOrderBody?.id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: editedOrderBody,
  });
}
