import { Input } from "antd";

import { InputBoxProps } from "./InputBoxTypes.ts";

const { Password } = Input;

function InputBox(props: InputBoxProps) {
  const inputBoxPropsFallback: InputBoxProps = {
    value: props.value ?? "",
    placeholder: props.placeholder ?? "",
    type: props.type ?? "text",
    disabled: props.disabled ?? false,
    onChange: props.onChange,
    onBlur: props.onBlur ?? undefined,
    size: props.size ?? "middle",
    prefix: props.prefix ?? undefined,
    suffix: props.suffix ?? undefined,
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
    ...inputProps
  } =
    inputBoxPropsFallback;

  return (
    <div className="input-box">
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>
      {props.type === "password" ? (
        <Password {...inputProps} status={iserror ? "error" : ""} key="1"/>
      ) : (
        <Input {...inputProps} status={iserror ? "error" : ""} key="2"/>
      )}
      <div className="input-box__err">{iserror ? errtext : null}</div>
    </div>
  );
}

export default InputBox;
