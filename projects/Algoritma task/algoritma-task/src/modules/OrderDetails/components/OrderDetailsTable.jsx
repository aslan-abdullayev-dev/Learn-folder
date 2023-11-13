import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
const OrderDetailsTable = (props) => {
  const {
    orderId,
    setShowCreate,
    setShowCancelOrder,
    setShowFinishOrder,
    setShowCancelFood,
    setSelectedFood,
  } = props;

  const orderData = useSelector((state) =>
    state?.orders?.filter((order) => order?.id == orderId)
  );

  const orderItems = orderData?.[0]?.orderItems;
  const statusId = orderData?.[0]?.statusId;
  const totalOfTableData = orderData?.[0]?.totalAmount;

  function createData(
    name,
    quantity,
    price,
    amount,
    orderTime,
    isCancelled,
    orderItemId
  ) {
    return {
      name,
      quantity,
      price,
      amount,
      orderTime,
      isCancelled,
      orderItemId,
    };
  }

  const rows = [];

  orderItems?.forEach((order) => {
    const {
      name,
      quantity,
      price,
      amount,
      orderTime,
      isCancelled,
      orderItemId,
    } = order;
    const tableRowData = createData(
      name,
      quantity,
      price,
      amount,
      orderTime,
      isCancelled,
      orderItemId
    );

    rows?.push(tableRowData);
  });

  const buttonStyles = (bgColor) => {
    return {
      backgroundColor: bgColor,
      color: "#fff",
      textTransform: "unset",
      margin: "10px 10px 10px 0",
      "&:hover": {
        backgroundColor: bgColor,
      },
    };
  };

  const paperStyles = (statusId) => {
    return {
      padding: "10px",
      color: statusId == 0 ? "red" : statusId == 1 ? "black" : "blue",
    };
  };

  let isAddProductDisabled;
  if (statusId === 0) {
    isAddProductDisabled = false;
  } else {
    isAddProductDisabled = true;
  }

  let isCancelOrderDisabled;
  if (statusId !== 0) {
    isCancelOrderDisabled = true;
  } else {
    isCancelOrderDisabled = false;
  }

  let isFinsihOrderDisabled;
  if (statusId !== 0) {
    isFinsihOrderDisabled = true;
  } else if (orderData?.[0]?.orderItems?.length === 0) {
    isFinsihOrderDisabled = true;
  } else isFinsihOrderDisabled = false;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={() => paperStyles(statusId)}>
        {statusId == 0
          ? "Sonlanmayıb"
          : statusId == 1
          ? "Sonlanıb"
          : "Ləğv edilib"}
      </Paper>

      <Button
        sx={() => buttonStyles("#10ad58")}
        disabled={isAddProductDisabled}
        onClick={() => setShowCreate(true)}
      >
        Məhsul əlavə et +
      </Button>
      <Button
        sx={() => buttonStyles("red")}
        disabled={isFinsihOrderDisabled}
        onClick={() => setShowFinishOrder(true)}
      >
        Sifarişi sonlandır
      </Button>
      <Button
        sx={() => buttonStyles("blue")}
        disabled={isCancelOrderDisabled}
        onClick={() => setShowCancelOrder(true)}
      >
        Sifarişi ləğv et
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: "350px" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>
            <b>Toplam : {totalOfTableData} MANAT</b>
          </caption>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "#10ad58",
                },
              }}
            >
              <TableCell>Sıralama</TableCell>
              <TableCell>Məhsul adı</TableCell>
              <TableCell>Miqdar</TableCell>
              <TableCell>Qiyməti</TableCell>
              <TableCell>Məbləğ</TableCell>
              <TableCell>Sifariş saatı</TableCell>
              <TableCell>#</TableCell>
              <TableCell>Sifarişi ləğv et</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              let dateTime, hours, minutes;

              if (row?.orderTime) {
                hours = new Date(row?.orderTime)?.getHours();
                minutes = new Date(row?.orderTime)?.getMinutes();
                dateTime = hours + ":" + minutes;
              }

              return (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {idx}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.quantity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.orderTime ? dateTime : "---"}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: row?.isCancelled ? "red" : "black" }}
                  >
                    {row?.isCancelled ? "imtina" : "--"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => {
                        setShowCancelFood(true);
                        setSelectedFood(row?.orderItemId);
                      }}
                      disabled={row?.isCancelled}
                    >
                      Ləğv et
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OrderDetailsTable;
