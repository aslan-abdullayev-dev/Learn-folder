import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { API_EDIT_ORDER } from "../../../redux/actions/main";

const CancelFood = (props) => {
  const { show, onHide, orderId, selectedFood } = props;

  const orderData = useSelector((state) =>
    state?.orders?.filter((order) => order?.id == orderId)
  );

  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    const editDate = new Date();

    const newOrderData = [...orderData]?.[0];
    newOrderData.lastEdited = editDate;

    const copyOrderItems = [...newOrderData.orderItems];

    const foodToCancel = copyOrderItems.filter(
      (foodOrder) => foodOrder.orderItemId === selectedFood
    )?.[0];

    const otherFoods = copyOrderItems.filter(
      (foodOrder) => foodOrder.orderItemId !== selectedFood
    );

    foodToCancel.isCancelled = true;

    const newFoodsData = [...otherFoods, foodToCancel];

    newOrderData.orderItems = newFoodsData;
    newOrderData.totalAmount = newOrderData.totalAmount - foodToCancel?.amount;

    dispatch({
      type: API_EDIT_ORDER,
      payload: newOrderData,
    });

    onHide(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="create"
      centered
      size="md"
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Məhsulu ləğv edin</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="light"
            type="button"
            onClick={() => {
              onHide(false);
            }}
          >
            İmtina
          </Button>
          <Button variant="success" onClick={handleCancelOrder}>
            Ləğv et
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
export default CancelFood;
