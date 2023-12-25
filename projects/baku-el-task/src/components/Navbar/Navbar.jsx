import "./Navbar.scss";

import React from "react";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <ThemeSwitch />
      </div>
      <div className="navbar-right"></div>
    </div>
  );
}

export default Navbar;
