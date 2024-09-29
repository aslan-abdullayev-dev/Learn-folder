import "./AuthLayout.scss";

import { Outlet } from "react-router-dom";
// import SvgLogo from "../../components/Icons/Logo.tsx";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__left">
        <Outlet/>
      </div>
      <div className="auth-layout__right">
        <div className="right-background"></div>
      </div>
    </div>
  )
}

export default AuthLayout;