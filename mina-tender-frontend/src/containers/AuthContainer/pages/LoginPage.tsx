import "../styles/AuthContainerStyle.scss";

import { useHtmlTitle } from "../../../shared/hooks/useHtmlTitle.ts";
import { Link } from "react-router-dom";
import InputBox from "../../../shared/components/FormComponents/InputBox/InputBox.tsx";
import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import SvgRightsLegal from "../../../shared/components/Icons/RightsLegal.tsx";

const LoginPage = () => {
  useHtmlTitle("Auth -> Login");

  return (
    <div className="auth-container">
      <p className="auth-links">
        <span className="name">Hesabın yoxdur?</span>
        <Link to="/" className='link'>Qeydiyyatdan keç</Link>
      </p>

      <div className="titles">
        <h1 className="title">Giriş edin</h1>
        <p className="subtitle">
          When you take out a subscription, you get instant access to all the
          services offered by the website.
        </p>
      </div>

      <form className="form">
        <div className="form-column">
          <InputBox
            value="asd"
            onChange={() => {
            }}
          />
          <InputBox
            value="asd"
            onChange={() => {
            }}
            type="password"
          />
          <ButtonEl buttonType="formSubmit" text="Daxil olun" style={{ width: '100%' }}/>
        </div>

      </form>

      <div className="legal">
        <span className="icon">
          <SvgRightsLegal/>
        </span>
        <span className="text">
          Bütün hüquqlar qorunur.
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
