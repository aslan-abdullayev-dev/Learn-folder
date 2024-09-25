import "./SelectboxStyles.scss";

import { Select } from "antd";
import { SelectBoxProps } from "./SelectBoxTypes.ts";
import { EnterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../../lib/Api.ts";

function SelectBox(props: SelectBoxProps) {
  const [loadedOptions, setLoadedOptions] = useState<any[]>([])

  const selectBoxProps: SelectBoxProps = {
    onChange: props.onChange,
    onSearch: props.onSearch ?? undefined,
    onBlur: props.onBlur ?? undefined,
    filterOption: props.filterOption,
    name: props.name,
    label: props.label,
    value: props.value,
    style: props.style ?? {},
    placeholder: props.placeholder ?? "",
    disabled: props.disabled ?? false,
    errtext: props.errtext ?? "",
    iserror: props.iserror ?? false,
    required: props.required ?? false,
    showSearch: props.showSearch ?? false,
    allowClear: props.allowClear ?? false,
  } as SelectBoxProps

  if (!props.filterOption) {
    selectBoxProps.filterOption = (input, option) => {
      return ((option?.label ?? '') as string).toLowerCase().includes(input.toLowerCase())
    }
  }

  if (props.mode) {
    selectBoxProps.mode = props.mode;
  }
  if (props.mode === "tags") {
    selectBoxProps.suffixIcon = <EnterOutlined/>;
  }

  if (props.type === "static-options") {
    selectBoxProps.type = "static-options"
    selectBoxProps.options = props.options;
  } else {
    selectBoxProps.type = "load-options"
    selectBoxProps.loadOptions = props.loadOptions;
    selectBoxProps.options = loadedOptions;
  }

  const {
    label,
    errtext,
    iserror,
    required,
    loadOptions,
    ...select_props_with_fallback
  } = selectBoxProps;

  useEffect(() => {
    if (loadOptions) {
      api({
        method: "get",
        url: loadOptions.url,
      })
        .then((res) => {
          const apiData: any = res.data.data;
          setLoadedOptions(
            apiData.map((apiOptions: any) => ({
              label: apiOptions[loadOptions.getOptionSettings.label],
              value: apiOptions[loadOptions.getOptionSettings.value],
            }))
          );
        })
        .catch(() => {
        });
    }
  }, []);

  return (
    <div className={`input-box`}>
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>
      <Select
        {...select_props_with_fallback}
        style={{ width: "100%" }}
        status={iserror ? "error" : ""}
      />
      <div className="input-box__err">{iserror ? errtext : null}</div>
    </div>
  );
}

export default SelectBox;
