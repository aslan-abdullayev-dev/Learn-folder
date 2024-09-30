import "./menu-items.scss"

import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  HomeOutlined,
} from "@ant-design/icons";

import { siteUrls } from "../../../../shared/constants/siteUrls.ts";

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultSelectedKeys = location.pathname.slice(1);
  const defaultOpenKeys: string[] = [];
  const locationPathArr = location.pathname.split("/").slice(0, -1);

  for (let i = 0; i < locationPathArr.length; i++) {
    const path = locationPathArr[i];
    if (!path) {
      defaultOpenKeys.push("/");
    } else {
      defaultOpenKeys.push(path);
    }
  }

  const items: MenuItem[] = [
    {
      label: "Home",
      key: siteUrls.auth.login,
      icon: <HomeOutlined/>,
      // children: [
      // {
      //   label: "Our History",
      //   key: siteUrls.home + "/" + siteUrls.ourHistory,
      // },
      // ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => navigate(e.key);

  return (
    <div>
      <Menu
        className="menu-items"
        onClick={onClick}
        defaultSelectedKeys={[defaultSelectedKeys]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default MenuItems;
