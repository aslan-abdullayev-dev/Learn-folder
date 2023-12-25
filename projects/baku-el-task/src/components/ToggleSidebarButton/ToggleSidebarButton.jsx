import "./ToggleSidebarButton.scss";

import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

function ToggleSidebarButton() {
  return (
    <Button className="toggle-sidebar-button">
      <DoubleLeftOutlined />
    </Button>
  );
}

export default ToggleSidebarButton;
