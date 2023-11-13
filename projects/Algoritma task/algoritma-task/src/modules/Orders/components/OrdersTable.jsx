import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import { timeFormatter } from "../../../utils/timeFormatter";
const OrdersTable = (props) => {
  const { setShowCreate } = props;
  const tableData = useSelector((state) => state?.orders);

  function createData(
    id,
    table,
    waiter,
    statusId,
    totalAmount,
    lastEdited,
    finishDate
  ) {
    return { id, table, waiter, statusId, totalAmount, lastEdited, finishDate };
  }

  const rows = [];

  const totalOfTableData = tableData?.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.totalAmount,
    0
  );

  const tableDataBy_Status_$_Date = tableData?.sort((a, b) => {
    // bu array funksiyasi cedveldeki datalari birinci statusa gore sonra ise tarixe gore siralayir

    if (a.statusId - b.statusId === 0) {
      const dateA = new Date(a.lastEdited)?.getTime();
      const dateB = new Date(b.lastEdited)?.getTime();

      if (dateA - dateB > 0) {
        return -1;
      } else if (dateA - dateB < 0) {
        return 1;
      } else {
        return 0;
      }
    }
    if (a.statusId - b.statusId < 0) {
      return -1;
    }
    if (a.statusId - b.statusId > 0) {
      return 1;
    }
  });

  tableDataBy_Status_$_Date?.forEach((order) => {
    const { id, table, waiter, statusId, totalAmount, lastEdited, finishDate } =
      order;
    const tableRowData = createData(
      id,
      table,
      waiter,
      statusId,
      totalAmount,
      lastEdited,
      finishDate
    );

    rows?.push(tableRowData);
  });

  const dispatch = useDispatch();

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        sx={{
          backgroundColor: "#10ad58",
          color: "#fff",
          textTransform: "unset",
          marginBlock: "10px",
          "&:hover": {
            backgroundColor: "#10ad58",
          },
        }}
        onClick={() => setShowCreate(true)}
      >
        Sifariş əlavə et +
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: "350px" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>
            <b>CƏMİ MƏBLƏĞ : {totalOfTableData} MANAT</b>
          </caption>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "#10ad58",
                },
              }}
            >
              <TableCell>Sifarişin kodu</TableCell>
              <TableCell>Masa</TableCell>
              <TableCell>Xidmətçi</TableCell>
              <TableCell>Sifariş statusu</TableCell>
              <TableCell>Məbləğ</TableCell>
              <TableCell>Dəyişmə tarixi</TableCell>
              <TableCell>Sonlanma tarixi</TableCell>
              <TableCell>Sifariş detalları</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              let dateTime, lastEdited;

              if (row?.finishDate) {
                dateTime = timeFormatter(row?.finishDate);
              }
              if (row?.lastEdited) {
                lastEdited = timeFormatter(row?.lastEdited);
              }

              return (
                <TableRow
                  key={idx}
                  sx={{
                    "& th": {
                      color:
                        row?.statusId === 0
                          ? "red"
                          : row?.statusId === 2
                          ? "blue"
                          : "",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.table}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.waiter}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.statusId === 0
                      ? "Sonlanmayıb"
                      : row?.statusId === 1
                      ? "Sonlanıb"
                      : "Ləğv edilib"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.totalAmount} AZN
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.lastEdited ? lastEdited : "---"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.finishDate ? dateTime : "---"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/orders/${row?.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button>Bax</Button>
                    </Link>
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
export default OrdersTable;
