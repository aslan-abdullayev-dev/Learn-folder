import "./Navbar.scss";

import React from "react";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import NavbarSearch from "../NavbarSearch/NavbarSearch";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <ThemeSwitch />
        <NavbarSearch />
      </div>
      <div className="navbar-right"></div>
    </div>
  );
}

export default Navbar;
