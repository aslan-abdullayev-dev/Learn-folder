import "../styles/AuthContainerStyle.scss";

import { useHtmlTitle } from "../../../shared/hooks/useHtmlTitle.ts";
import { Link } from "react-router-dom";
import InputBox from "../../../shared/components/FormComponents/InputBox/InputBox.tsx";
import ButtonEl from "../../../shared/components/ButtonEl/ButtonEl.tsx";
import SvgRightsLegal from "../../../shared/components/Icons/RightsLegal.tsx";
import SelectBox from "../../../shared/components/FormComponents/SelectBox/SelectBox.tsx";

const RegisterPage = () => {
  useHtmlTitle("Auth -> Register");

  return (
    <div className="auth-container">
      <p className="auth-links">
        <span className="name">Artıq hesabın var?</span>
        <Link to="/auth/login" className='link'>Giriş et</Link>
      </p>

      <div className="titles">
        <h1 className="title">Qeydiyyatdan keç</h1>
        <p className="subtitle">
          When you take out a subscription, you get instant access to all the
          services offered by the website.
        </p>
      </div>

      <form className="form">
        <div className="form-column">
          <InputBox
            value=""
            onChange={() => {
            }}
            label="Ad"
          />
          <InputBox
            value=""
            onChange={() => {
            }}
            label="Email"
          />
          <SelectBox
            name="po"
            loadOptions={undefined}
            type="static-options"
            value=""
            onChange={() => {
            }}
            options={[]}
            label="Maraq Dairəsi"
          />
          <ButtonEl buttonType="formSubmit" text="Qeydiyyatdan keç" style={{ width: '100%' }}/>
        </div>
        <div className="form-column">
          <InputBox
            value=""
            onChange={() => {
            }}
            label="Soyad"
          />
          <InputBox
            value=""
            onChange={() => {
            }}
            label="Mobil nömrəsi"
            prefix="+994"
          />
          <InputBox
            value=""
            onChange={() => {
            }}
            label="Şifrə"
            type="password"
          />
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

export default RegisterPage;
