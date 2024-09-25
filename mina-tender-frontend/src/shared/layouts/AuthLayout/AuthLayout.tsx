import "./AuthLayout.scss";

import { Outlet } from "react-router-dom"
import SvgLogo from "../../components/Icons/Logo.tsx";

const AuthLayout = () => {
  return (
    <div className="auth-layout">

      <div className="auth-layout__content">
        <div className="auth-layout__content-header">
         <SvgLogo/>
        </div>
        <div className="auth-layout__content-form"><Outlet/></div>
      </div>
    </div>
  )
}

export default AuthLayout;