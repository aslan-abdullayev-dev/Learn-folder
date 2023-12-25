import { Select } from "antd";
import "./LangSelect.scss";

import React from "react";

function LangSelect() {
  return (
    <div className="lang-select">
      <Select
        options={[
          { label: "En", value: "en" },
          { label: "Az", value: "aze" },
          { label: "Ru", value: "ru" },
        ]}
        defaultValue="en"
        suffixIcon={null}
        defaultOpen
        popupClassName="lang-select-dropdown"
      />
    </div>
  );
}

export default LangSelect;
