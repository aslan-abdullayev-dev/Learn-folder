import "./SwitchElStyles.scss"

import { Switch } from "antd";
import { SwitchElProps } from "./SwitchElTypes.ts";

function SwitchEl(props: SwitchElProps) {
  const switchElFallback: SwitchElProps = {
    checked: props.checked,
    onChange: props.onChange,
    disabled: props.disabled ?? false,
    size: props.size ?? "small",
  };

  return (
    <span className="switch-el">
      <Switch {...switchElFallback} />
    </span>
  );
}

export default SwitchEl;
