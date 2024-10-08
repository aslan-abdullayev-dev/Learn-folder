import "../styles/all-tenders-styles.scss"

import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import { Button, Divider, Drawer, Input } from "antd";
import SvgLogo from "../../../shared/components/Icons/Logo.tsx";
import MenuItems from "../components/menu-items/menu-items.tsx";
import SvgFilter from "../../../shared/components/Icons/Filter.tsx";
import TableEl from "../../../shared/components/UIComponents/TableEl/TableEl.tsx";
import { ColumnsType } from "antd/es/table/interface";
import AllTendersFilterModal
  from "../components/all-tenders-filter-modal/all-tenders-filter-modal.tsx";

const AllTendersPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilterTendersModal, setShowTendersModal] = useState(false);

  const tenderTableColumns: ColumnsType<any> = [
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
      title: "Təsnifat kodu",
      dataIndex: "categoryCodes",
      key: "categoryCodes",
      render: () => <span>kodlar</span>,
      width: 130
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

  const tableData = [
    {
      id: 1,
      buyerOrganizationName: "BAKI ŞƏHƏR MƏNZİL-KOMMUNAL TƏSƏRRÜFATI DEPARTAMENTİNİN SANİTARİYA VƏ TEXNİKİ TƏMİZLİK İDARƏSİ",
      eventName: "“Maşın və avadanlıqların, təsərrufat malları və təsərrüfat alətlərinin satın alınması”",
      publishDate: "2024-09-19T14:06:51",
      endDate: "2024-09-19T14:06:51",
      categoryCodes: [
        {
          id: 1081,
          code: "23211000 Elektron montaj maşınları və köməkçi avadanlıqlar"
        },
        {
          id: 1203,
          code: "25191700 Avtomobilə texniki xidmət avadanlığı"
        },
        {
          id: 1551,
          code: "26111600 Elektrik generatorları"
        },
        {
          id: 507,
          code: "40151500 Nasoslar"
        },
        {
          id: 1046,
          code: "72154200 Alətlərin quraşdırılması və təmiri işləri"
        }
      ],
      participationFee: null,
      viewFee: null
    }
  ]

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
          <TableEl columns={tenderTableColumns} tableData={tableData}/>
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