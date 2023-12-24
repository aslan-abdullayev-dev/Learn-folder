import "./Sidebar.scss";
import img1 from "../../assets/img/sidebar-img-1.png";
import img2 from "../../assets/img/sidebar-img-2.png";
import Logo from "../../assets/svg/be_logo.svg?react";

import React, { useState } from "react";

import { sidebarData } from "../../constants/sidebarData";
import ToggleSidebarButton from "../ToggleSidebarButton/ToggleSidebarButton";

function Sidebar() {
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);
  const [isMouseOnMenuItem, setIsMouseOnMenuItem] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarIsCollapsed(!sidebarIsCollapsed);
  };

  const handleHoverMenuItem = (type, menuHasChildren) => {
    if (menuHasChildren && type === "on") {
      setIsMouseOnMenuItem(true);
    } else {
      setIsMouseOnMenuItem(false);
    }
  };

  return (
    <div className={`sidebar ${sidebarIsCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <Logo />
        {!sidebarIsCollapsed && !isMouseOnMenuItem && (
          <ToggleSidebarButton
            isOpen={!sidebarIsCollapsed}
            onClick={handleToggleSidebar}
          />
        )}
        <div className="sidebar-close-button">
          {sidebarIsCollapsed && (
            <ToggleSidebarButton
              isOpen={!sidebarIsCollapsed}
              onClick={handleToggleSidebar}
            />
          )}
        </div>
      </div>
      <ul className="sidebar-bottom">
        {sidebarData.map((menuItem, i) => {
          const Icon = menuItem.icon;
          return (
            <li
              key={i}
              className="menu-item"
              onMouseEnter={() =>
                handleHoverMenuItem("on", menuItem.children.length)
              }
              onMouseLeave={() =>
                handleHoverMenuItem("off", menuItem.children.length)
              }
            >
              <div className="menu-item-label">
                <Icon />
                <span>{menuItem.name}</span>
              </div>
              {menuItem.children && menuItem.children.length ? (
                <div className="menu-item-hover-content">
                  <ul className="content-links">
                    {menuItem.children.map((subCategory, j) => (
                      <li key={j} className="content-subcategory">
                        <a href="" className="subcategory-title">
                          {subCategory.categoryName}
                        </a>
                        <ul className="subcategory-items">
                          {subCategory.categoryItems.map((item, k) => (
                            <li key={k} className="subcategory-items-item">
                              <a href="">{item.itemName}</a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  <div className="content-advertisement">
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
