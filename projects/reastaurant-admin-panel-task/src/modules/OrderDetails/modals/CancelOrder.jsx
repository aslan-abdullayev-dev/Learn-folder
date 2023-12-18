import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { API_EDIT_ORDER } from "../../../redux/actions/main";

const CancelOrder = (props) => {
  const { show, onHide, orderId } = props;

  const orderData = useSelector((state) =>
    state?.orders?.filter((order) => order?.id == orderId)
  );

  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    const editDate = new Date();

    const newOrderData = [...orderData]?.[0];
    newOrderData.lastEdited = editDate;
    newOrderData.totalAmount = 0;

    newOrderData.statusId = 2;

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
          <Modal.Title>Sifarişi ləğv edin</Modal.Title>
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
export default CancelOrder;
