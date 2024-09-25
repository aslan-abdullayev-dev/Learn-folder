import "./TableElStyles.scss"

import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table, InputRef, TablePaginationConfig } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { TTableElProps } from "./TableElTypes.ts";

function TableEl(props: TTableElProps) {
  const {
    columns,
    tableData,
    pagination,
    onChange
  } = props;
  const uid = props.uid ?? "id";
  const searchInput = useRef<InputRef>(null);


  const [paginationConfig, setPaginationConfig] = useState<false | TablePaginationConfig>(() => {
    if (pagination === true || pagination === undefined) {
      return {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "50"],
        showSizeChanger: true,
      }
    } else if (typeof pagination === "object") {
      return pagination
    } else if (pagination === false) {
      return false
    } else return false
  });

  useEffect(() => {
    if (paginationConfig && typeof pagination === "object") {
      if (
        paginationConfig.current != pagination.current ||
        paginationConfig.pageSize != pagination.pageSize ||
        paginationConfig.total != pagination.total ||
        paginationConfig.pageSizeOptions != pagination.pageSizeOptions
      ) {
        setPaginationConfig({
          ...paginationConfig,
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total
        })
      }
    }
  }, [pagination]);


  const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
    confirm();
  };

  const getColumnSearchProps = (dataIndex: any): any => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      // close,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space.Compact block>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined/>}
            size="small"
            style={{ width: "50%" }}
          >
            Search
          </Button>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
            }}
            style={{ width: "50%" }}
          >
            Reset
          </Button>
        </Space.Compact>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }}/>
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columnsWithSearch: any = columns.map((column: any) => {
    const showFilter: boolean = column.filterDropdown;
    if (showFilter) {
      return {
        ...column,
        ...getColumnSearchProps(column.key),
      };
    } else {
      return column;
    }
  });

  const handleChange = (newPaginationConfig: TablePaginationConfig) => {
    if (onChange && paginationConfig !== false && paginationConfig !== undefined) {
      onChange(newPaginationConfig)
    }
    setPaginationConfig(newPaginationConfig)
  }

  return (
    <Table
      rowKey={(record) => record[uid]}
      className="custom-table-el"
      bordered
      columns={columnsWithSearch}
      dataSource={tableData}
      onChange={handleChange}
      pagination={paginationConfig ? {
        ...paginationConfig,
        showTotal: (total, range) => {
          const space: string = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`;
          return (
            `Total: ${total}` +
            space +
            `Page: ${Math.ceil(range[1] / paginationConfig.pageSize!)}`
          );
        },
      } : false}
    />
  );
}

export default TableEl;
