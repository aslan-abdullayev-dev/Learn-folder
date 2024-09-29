import "./HeaderStyles.scss"

import { Link } from "react-router-dom";

import SvgLogo from "../../Icons/Logo.tsx";

const Header = () => {
  return (
    <nav className="header">
      <div className="header-left">
        <Link to="/"><SvgLogo/></Link>
      </div>
      <div className="header-right">
        {/*<div className="authorized"></div>*/}
        <div className="unauthorized">
          <Link to="/auth/register" className="register">Qeydiyyat</Link>
          <Link to="/auth/login" className="login">Giriş</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header;