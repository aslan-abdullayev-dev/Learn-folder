import "../styles/all-tenders-styles.scss"

import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Input } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { useState } from "react";

import TableEl from "../../../shared/components/UIComponents/TableEl/TableEl.tsx";
import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import SvgFilter from "../../../shared/components/Icons/Filter.tsx";
import useTenderDataFilter from "../hooks/use-tender-data-filter.ts";
import SvgLogo from "../../../shared/components/Icons/Logo.tsx";
import MenuItems from "../components/menu-items/menu-items.tsx";
import { ITender } from "../types/tender-type.ts";
import AllTendersFilterModal
  from "../components/all-tenders-filter-modal/all-tenders-filter-modal.tsx";

const AllTendersPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilterTendersModal, setShowTendersModal] = useState(false);

  const tenderTableColumns: ColumnsType<ITender> = [
    {
      title: "Satınalan təşkilatın adı",
      dataIndex: "buyerOrganizationName",
      key: "buyerOrganizationName",
      width: 250
    },
    {
      title: "Satınalan predmeti",
      dataIndex: "eventName",
      key: "eventName",
      width: 280
    },
    {
      title: "Dərc edilmə tarixi",
      dataIndex: "publishDate",
      key: "publishDate",
      width: 170
    },
    {
      title: "Bitmə tarixi",
      dataIndex: "endDate",
      key: "endDate",
      width: 170
    },
    {
      title: "İştirak haqqı",
      dataIndex: "participationFee",
      key: "participationFee",
      width: 170
    },
    {
      title: "İstifadə haqqı",
      dataIndex: "viewFee",
      key: "viewFee",
      width: 170
    }
  ]
  const {
    tendersData,
    setTendersData,
    tablePaginationConfigs,
    getTenderFilteredData,
    createQueryFromObject,
    createObjectFromQuery
  } = useTenderDataFilter()

  return (
    <>
      <main className="all-tenders">
        <div className="subheader">
          <ButtonEl
            buttonType="default"
            text={<span className="menu-button"><MenuOutlined/> Menu</span>}
            onClick={() => setShowMenu(!showMenu)}
          />
          <h1 className="title">Müsabiqə elanları</h1>
        </div>
        <div className="searchbar">
          {setShowTendersModal &&
            <AllTendersFilterModal
              isOpen={showFilterTendersModal}
              setIsOpen={setShowTendersModal}
              setTendersData={setTendersData}
              createQueryFromObject={createQueryFromObject}
              createObjectFromQuery={createObjectFromQuery}
            />}
          <Input.Group compact>
            <Button
              icon={<SvgFilter/>}
              iconPosition="end"
              size="large"
              style={{ background: "#F5F5F5", width: "180px" }}
              onClick={() => setShowTendersModal(true)}
            >
              Ətraflı axtarış
            </Button>
            <Input
              style={{ width: 'calc(100% - 340px)' }}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined/>}
              style={{ width: "160px" }}
            >
              Axtar
            </Button>
          </Input.Group>
        </div>
        <Divider/>
        <div className="tenders-table">
          <TableEl
            columns={tenderTableColumns}
            tableData={tendersData}
            pagination={tablePaginationConfigs}
            onChange={getTenderFilteredData}
          />
        </div>
      </main>
      <Drawer
        title={<SvgLogo/>}
        onClose={() => setShowMenu(false)}
        open={showMenu}
        closable={false}
        placement="left"
        rootClassName="menu-drawer"
      >
        <MenuItems/>
      </Drawer>
    </>
  )
}

export default AllTendersPage;