import { Input } from "antd";

import { TextAreaProps } from "./TextAreaBoxTypes.ts";

const { TextArea } = Input;

function TextAreaBox(props: TextAreaProps) {
  const inputBoxPropsFallback: TextAreaProps = {
    value: props.value ?? "",
    rows: props.rows ?? 3,
    placeholder: props.placeholder ?? "",
    disabled: props.disabled ?? false,
    onChange: props.onChange ?? undefined,
    onBlur: props.onBlur ?? undefined,
    name: props.name ?? "",
    iserror: props.iserror ?? false,
    errtext: props.errtext ?? "",
    label: props.label ?? "",
    required: props.required ?? false,
  };

  const {
    iserror,
    errtext,
    label,
    required,
    rows,
    ...inputProps
  } = inputBoxPropsFallback;

  return (
    <div className={`input-box`}>
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>

      <TextArea
        autoSize={{ minRows: rows, maxRows: rows }}
        status={iserror ? "error" : ""}
        {...inputProps}
        />
        <div className="input-box__err">{iserror ? errtext : null}</div>
    </div>
);
}

export default TextAreaBox;
