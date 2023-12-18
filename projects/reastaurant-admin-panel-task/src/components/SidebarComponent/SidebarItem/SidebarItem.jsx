import { NavLink } from "react-router-dom";

import "./SidebarItem.scss";

const SidebarItem = (props) => {
  const { path, name, icon } = props;
  return (
    <NavLink to={path} className="link">
      {({ isActive }) => (
        <span
          className={isActive ? "link__content link__content--active" : "link__content"}
        >
          {icon}
          <span>{name}</span>
        </span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
