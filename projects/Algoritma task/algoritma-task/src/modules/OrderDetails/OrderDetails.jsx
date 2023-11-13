import "./styles/OrderDetails.scss";
import { useParams } from "react-router-dom";

import OrderDetailsTable from "./components/OrderDetailsTable";
import Create from "./modals/Create";
import CancelOrder from "./modals/CancelOrder";
import FinishOrder from "./modals/FinishOrder";
import CancelFood from "./modals/CancelFood";
import { useState } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const [showCreate, setShowCreate] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [showFinishOrder, setShowFinishOrder] = useState(false);
  const [showCancelFood, setShowCancelFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="order-details">
      <div className="order-details__nav">{id} Nömrəli Sifarişin Detalları</div>
      <div className="order-details__content">
        <OrderDetailsTable
          orderId={id}
          setShowCreate={setShowCreate}
          setShowCancelOrder={setShowCancelOrder}
          setShowFinishOrder={setShowFinishOrder}
          setShowCancelFood={setShowCancelFood}
          setSelectedFood={setSelectedFood}
        />
      </div>

      <Create orderId={id} show={showCreate} onHide={setShowCreate} />

      <CancelOrder
        orderId={id}
        show={showCancelOrder}
        onHide={setShowCancelOrder}
      />

      <FinishOrder
        orderId={id}
        show={showFinishOrder}
        onHide={setShowFinishOrder}
      />

      <CancelFood
        orderId={id}
        show={showCancelFood}
        onHide={setShowCancelFood}
        selectedFood={selectedFood}
      />
    </div>
  );
};

export default OrderDetails;
