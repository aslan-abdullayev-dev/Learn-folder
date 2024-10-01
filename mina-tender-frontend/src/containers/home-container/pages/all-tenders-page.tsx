import "../styles/all-tenders-styles.scss"

import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import { Drawer } from "antd";
import SvgLogo from "../../../shared/components/Icons/Logo.tsx";
import MenuItems from "../components/menu-items/menu-items.tsx";

const AllTendersPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="all-tenders">
      <div className="subheader">
        <ButtonEl
          buttonType="default"
          text={<span className="menu-button"><MenuOutlined/> Menu</span>}
          onClick={() => setShowMenu(!showMenu)}
        />
        <h1 className="title">Müsabiqə elanları</h1>
      </div>
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
    </main>
  )
}

export default AllTendersPage;