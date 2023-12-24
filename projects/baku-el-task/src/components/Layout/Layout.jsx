import "./Layout.scss";

import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";

function Layout() {
  return (
    <div className="layout">
      <div className="layout-left">
        <Sidebar />
      </div>
      <div className="layout-right">
        <div className="layout-navbar">
          <Navbar />
        </div>
        <div className="layout-body">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Layout;
