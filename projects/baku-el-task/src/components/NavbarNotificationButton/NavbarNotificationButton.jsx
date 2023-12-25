import "./NavbarNotificationButton.scss";

import React from "react";

function NavbarNotificationButton({ icon, notificationCount }) {
  return (
    <span className="navbar-notification-button">
      <button className="notification-button">{icon}</button>
      {notificationCount ? (
        <span className="notification-count">
          {notificationCount < 9 ? notificationCount : "9+"}
        </span>
      ) : null}
    </span>
  );
}

export default NavbarNotificationButton;
