import { switchBoxProps } from "./SwitchBoxTypes.ts";

import SwitchEl from "../SwitchEl/SwitchEl.tsx";

function SwitchBox(props: switchBoxProps) {
  const switch_props_with_fallback: switchBoxProps = {
    label: props.label ?? "",
    required: props.required ?? false,
    mean: props.mean ?? {
      true: "True",
      false: "False"
    },
    iserror: props.iserror ?? false,
    errtext: props.errtext ?? "",
    checked: props.checked ? true : false,
    onChange: props.onChange ?? undefined,
    disabled: props.disabled ?? false,
    name: props.name ?? ""
  };

  const {
    iserror,
    errtext,
    label,
    required,
    mean
  } = switch_props_with_fallback;

  return (
    <div className="input-box">
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>
      <div
        className={`wrapper ${iserror ? "wrapper__error" : ""}`}
        style={{ paddingInline: "11px" }}
      >
        <div className="wrapper__left">
          <span>{mean![`${switch_props_with_fallback.checked}`]}</span>
        </div>
        <div className="wrapper__right">
          <SwitchEl {...switch_props_with_fallback} />
        </div>
      </div>

      <div className="input-box__err">{iserror ? errtext : null}</div>
    </div>
  );
}

export default SwitchBox;
