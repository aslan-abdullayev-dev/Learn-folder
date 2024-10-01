import "../styles/all-tenders-styles.scss"

import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import { Button, Drawer, Input } from "antd";
import SvgLogo from "../../../shared/components/Icons/Logo.tsx";
import MenuItems from "../components/menu-items/menu-items.tsx";
import SvgFilter from "../../../shared/components/Icons/Filter.tsx";

const AllTendersPage = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          <Input.Group compact>
            <Button
              icon={<SvgFilter/>}
              iconPosition="end"
              size="large"
              style={{ background: "#F5F5F5", width: "180px" }}
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
          </Input.Group></div>
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