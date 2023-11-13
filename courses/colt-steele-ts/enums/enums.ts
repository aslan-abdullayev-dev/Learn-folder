//  Enums allow us to define a set of named constants

enum OrderStatus {
  PENDING,
  SHIPPED,
  RETURNED,
  DELIVERED,
}

const myStatus = OrderStatus.DELIVERED;

function isDelivered(status: OrderStatus): boolean {
  return status === OrderStatus.DELIVERED;
}

isDelivered(OrderStatus.DELIVERED); // return true
isDelivered("21");
isDelivered(7); // returns false

// ==================================================================
// ==================================================================

enum OrderStatus2 {
  PENDING = 5,
  SHIPPED,
  DELIVERED,
  RETURNED,
}

enum OrderStatus3 {
  PENDING = "1",
  SHIPPED = "2",
  DELIVERED,
  RETURNED,
}

enum OrderStatus4 {
  PENDING = "1",
  SHIPPED = "2",
  DELIVERED = 76,
  RETURNED = 213,
}

enum OrderStatus5 {
  PENDING = "1",
  SHIPPED = "2",
  DELIVERED = true,
  RETURNED = null,
}

// ==================================================================
// ==================================================================
