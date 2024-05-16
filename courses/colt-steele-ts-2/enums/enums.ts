enum myEnum {
  "aslan" = "1",
  "cavidan" = 0,
  "etibar",
}

console.log(myEnum[0])

//================================
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Returned
}

function isDelivered(status: OrderStatus) {
  return status === OrderStatus.Delivered
}

isDelivered(OrderStatus.Shipped)