import "./NavbarSearch.scss";

import { Input, Space } from "antd";
import React from "react";

import SearchIcon from "../../assets/svg/search.svg?react";

function NavbarSearch() {
  return (
    <div className="navbar-search">
      <Space.Compact size="large">
        <Input addonBefore={<SearchIcon />} placeholder="Axtar..." />
      </Space.Compact>
    </div>
  );
}

export default NavbarSearch;
