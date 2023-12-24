import "./ToggleSidebarButton.scss";

import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

function ToggleSidebarButton({ isOpen, onClick }) {
  return (
    <Button onClick={onClick} className="toggle-sidebar-button">
      {isOpen ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
    </Button>
  );
}

export default ToggleSidebarButton;
