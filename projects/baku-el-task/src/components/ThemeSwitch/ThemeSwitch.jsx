import "./ThemeSwitch.scss";

import React, { useState } from "react";

import SunIcon from "../../assets/svg/sun.svg?react";
import MoonIcon from "../../assets/svg/moon.svg?react";

function ThemeSwitch() {
  return (
    <div>
      <input type="checkbox" className="checkbox" />
      <label htmlFor="checkbox" className="label">
        <MoonIcon className="MoonIcon" />
        <SunIcon className="SunIcon" />
        <div className="ball"></div>
      </label>
    </div>
  );
}

export default ThemeSwitch;
