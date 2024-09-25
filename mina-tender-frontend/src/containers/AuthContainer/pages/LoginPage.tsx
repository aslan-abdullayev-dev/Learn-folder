import "../styles/AuthContainerStyle.scss";

import { useHtmlTitle } from "../../../shared/hooks/useHtmlTitle.ts";

const LoginPage = () => {
  useHtmlTitle("Auth -> Login");

  return (
    <div className="auth-container">
      login
    </div>
  );
};

export default LoginPage;
