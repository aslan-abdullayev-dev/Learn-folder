"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
axios_1.default
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then(({ data }) => {
    console.log("woo! ==>");
    printUser(data);
})
    .catch((err) => {
    console.log("err ==>", err);
});
axios_1.default
    .get("https://jsonplaceholder.typicode.com/users")
    .then(({ data }) => {
    console.log("woo2! ==>");
    printUsers(data);
})
    .catch((err) => {
    console.log("err ==>", err);
});
function printUser(user) {
    console.log(user.name);
    console.log(user.email);
    console.log(user.phone);
}
function printUsers(users) {
    console.log(users);
}
