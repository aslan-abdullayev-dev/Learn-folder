//  Enums allow us to define a set of named constants
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDING"] = 0] = "PENDING";
    OrderStatus[OrderStatus["SHIPPED"] = 1] = "SHIPPED";
    OrderStatus[OrderStatus["DELIVERED"] = 2] = "DELIVERED";
    OrderStatus[OrderStatus["RETURNED"] = 3] = "RETURNED";
})(OrderStatus || (OrderStatus = {}));
var myStatus = OrderStatus.DELIVERED;
function isDelivered(status) {
    return status === OrderStatus.DELIVERED;
}
isDelivered(OrderStatus.DELIVERED);
isDelivered("21");
var data = isDelivered(7);
console.log(data);
// ==================================================================
// ==================================================================
var OrderStatus2;
(function (OrderStatus2) {
    OrderStatus2[OrderStatus2["PENDING"] = 5] = "PENDING";
    OrderStatus2[OrderStatus2["SHIPPED"] = 6] = "SHIPPED";
    OrderStatus2[OrderStatus2["DELIVERED"] = 7] = "DELIVERED";
    OrderStatus2[OrderStatus2["RETURNED"] = 8] = "RETURNED";
})(OrderStatus2 || (OrderStatus2 = {}));
var OrderStatus3;
(function (OrderStatus3) {
    OrderStatus3["PENDING"] = "1";
    OrderStatus3["SHIPPED"] = "2";
    OrderStatus3[OrderStatus3["DELIVERED"] = void 0] = "DELIVERED";
    OrderStatus3[OrderStatus3["RETURNED"] = void 0] = "RETURNED";
})(OrderStatus3 || (OrderStatus3 = {}));
var OrderStatus4;
(function (OrderStatus4) {
    OrderStatus4["PENDING"] = "1";
    OrderStatus4["SHIPPED"] = "2";
    OrderStatus4[OrderStatus4["DELIVERED"] = 76] = "DELIVERED";
    OrderStatus4[OrderStatus4["RETURNED"] = 213] = "RETURNED";
})(OrderStatus4 || (OrderStatus4 = {}));
var OrderStatus5;
(function (OrderStatus5) {
    OrderStatus5["PENDING"] = "1";
    OrderStatus5["SHIPPED"] = "2";
    OrderStatus5[OrderStatus5["DELIVERED"] = 0] = "DELIVERED";
    OrderStatus5[OrderStatus5["RETURNED"] = 0] = "RETURNED";
})(OrderStatus5 || (OrderStatus5 = {}));
