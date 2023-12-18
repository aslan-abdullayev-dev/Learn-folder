import "./styles/Orders.scss";
import OrdersTable from "./components/OrdersTable";
import Create from "./modals/Create";
import { useState } from "react";

const Orders = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="orders">
      <div className="orders__nav">Sifarişlərim</div>
      <div className="orders__content">
        <OrdersTable setShowCreate={setShowCreate} />
      </div>

      <Create show={showCreate} onHide={setShowCreate} />
    </div>
  );
};

export default Orders;
