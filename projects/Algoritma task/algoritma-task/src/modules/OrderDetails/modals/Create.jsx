import "../styles/Create.scss";
import { Modal, Button } from "react-bootstrap";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { API_EDIT_ORDER } from "../../../redux/actions/main";

const Create = (props) => {
  const { show, onHide, orderId } = props;
  const [selectedFood, setSelectedFood] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();

  const reduxFoodMenu = useSelector((state) => state.foodMenu);

  const orderData = useSelector((state) =>
    state?.orders?.filter((order) => order?.id == orderId)
  );

  const initialValues = {
    food: "",
    quantity: 0,
  };
  const OrderFoodSchema = Yup.object().shape({
    food: Yup.string().required("Məhsul seçin"),
    quantity: Yup.number()
      .integer("Zəhmət olmasa tam ədəd daxil edin")
      .min(1, "Ən az bir ədəd seçməlisiniz"),
  });

  const onPostOrder = (values, resetForm) => {
    const editDate = new Date();

    const newOrderData = [...orderData]?.[0];
    const orderItem = {
      name: selectedFood?.name,
      quantity: values?.quantity,
      price: selectedFood?.amount,
      amount: values?.quantity * selectedFood?.amount,
      orderTime: editDate,
      isCancelled: false,
      orderItemId: Math.round(Math.random() * 1_000_100),
    };
    newOrderData.orderItems = [...newOrderData?.orderItems, orderItem];
    newOrderData.lastEdited = editDate;
    newOrderData.totalAmount = newOrderData?.totalAmount + totalAmount;

    dispatch({
      type: API_EDIT_ORDER,
      payload: newOrderData,
    });

    resetForm();
    onHide(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: OrderFoodSchema,
    onSubmit: (values, { resetForm }) => {
      onPostOrder(values, resetForm);
    },
  });

  const getInputClasses = (filedName) => {
    if (formik.touched[filedName] && formik.errors[filedName]) {
      return true;
    }
    if (formik.touched[filedName] && !formik.errors[filedName]) {
      return false;
    }
    return false;
  };

  useEffect(() => {
    formik.resetForm();
    setTotalAmount(0);
    setSelectedFood({});
  }, [show]);

  useEffect(() => {
    // calculating total amount
    const { food, quantity } = formik.values;

    if (food) {
      const choosenFood = reduxFoodMenu?.filter(
        (menuItem) => menuItem.id == food
      );
      setTotalAmount(+choosenFood?.[0]?.amount * quantity);
      setSelectedFood(choosenFood?.[0]);
    }
  }, [formik.values.food, formik.values.quantity]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="create"
      centered
      size="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Məhsul sifariş edin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 pl-4 pr-4">
            <div className="row">
              <div className="col-12  mb-2">
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="foodMenu-select-label">
                      Məhsul adı
                    </InputLabel>
                    <Select
                      labelId="foodMenu-select-label"
                      id="foodMenu-select"
                      label="foodMenu"
                      error={getInputClasses("food")}
                      {...formik.getFieldProps("food")}
                    >
                      {reduxFoodMenu?.map((food) => {
                        return (
                          <MenuItem key={food?.name} value={food?.id}>
                            {`${food.name} - ${food.amount} AZN `}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <div className="error">
                  {formik.touched.food && formik.errors.food ? (
                    <div className="error__message">{formik.errors.food}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-6">
                <Box>
                  <TextField
                    type="number"
                    label=" Miqdarı"
                    variant="outlined"
                    error={getInputClasses("quantity")}
                    {...formik.getFieldProps("quantity")}
                  />
                </Box>
                <div className="error">
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="error__message">
                      {formik.errors.quantity}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-6">
                <Box>
                  <TextField
                    disabled
                    label="Cəmi"
                    variant="outlined"
                    value={`${totalAmount} AZN`}
                  />
                </Box>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => {
              onHide(false);
            }}
          >
            Ləğv et
          </Button>
          <Button variant="success" type="submit">
            Məhsulu sifariş et
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create;
