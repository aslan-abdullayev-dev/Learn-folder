import "../styles/Create.scss";
import { Modal, Button } from "react-bootstrap";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { API_SET_NEW_ORDER } from "../../../redux/actions/main";

const Create = (props) => {
  const { show, onHide } = props;
  const reduxTables = useSelector((state) => state.tables);
  const reduxWaiters = useSelector((state) => state.waiters);
  const dispatch = useDispatch();

  const initialValues = {
    table: "",
    waiter: "",
  };

  const NeWOrderSchema = Yup.object().shape({
    table: Yup.string().required("Masa seçin"),
    waiter: Yup.string().required("Xidmətçi seçin"),
  });

  const onPostOrder = (values, resetForm) => {

    const editDate = new Date();

    dispatch({
      type: API_SET_NEW_ORDER,
      payload: {
        id: Math.round(Math.random() * 1000_000),
        table: values.table,
        waiter: values.waiter,
        statusId: 0,
        totalAmount: 0,
        finishDate: "",
        lastEdited: editDate,
        orderItems: [],
      },
    });

    resetForm();
    onHide(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: NeWOrderSchema,
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
  }, [show]);

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
          <Modal.Title>Sifariş əlavə edin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 pl-4 pr-4">
            <div className="row">
              <div className="col-6">
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="table-select-label">Masa</InputLabel>
                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      label="table"
                      error={getInputClasses("table")}
                      {...formik.getFieldProps("table")}
                    >
                      {reduxTables?.map((table) => {
                        return (
                          <MenuItem key={table} value={table}>
                            {table}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <div className="error">
                  {formik.touched.table && formik.errors.table ? (
                    <div className="error__message">{formik.errors.table}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-6">
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="waiter-select-label">Xidmetci</InputLabel>
                    <Select
                      labelId="waiter-select-label"
                      id="waiter-select"
                      label="waiter"
                      error={getInputClasses("waiter")}
                      {...formik.getFieldProps("waiter")}
                    >
                      {reduxWaiters?.map((waiter) => {
                        return (
                          <MenuItem key={waiter} value={waiter}>
                            {waiter}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <div className="error">
                  {formik.touched.waiter && formik.errors.waiter ? (
                    <div className="error__message">{formik.errors.waiter}</div>
                  ) : null}
                </div>
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
            Sifarişi yarat
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create;
