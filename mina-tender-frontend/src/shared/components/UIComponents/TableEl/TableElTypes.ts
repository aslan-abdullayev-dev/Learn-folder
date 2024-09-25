import { ColumnsType } from "antd/es/table/interface";
import { TablePaginationConfig } from "antd";

type WithoutCustomPaginationProps = {
  pagination?: false;
  onChange?: never
};

type WithPaginationProps = {
  pagination: TablePaginationConfig | true | undefined;
  onChange: (values: TablePaginationConfig) => void;
};

export type TTableElProps = {
  columns: ColumnsType<any>;
  tableData: any[];
  uid?: any;
} & (WithoutCustomPaginationProps | WithPaginationProps);