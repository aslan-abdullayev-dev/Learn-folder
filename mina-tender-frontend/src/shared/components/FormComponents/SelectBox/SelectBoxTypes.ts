import { SelectProps } from "antd";
import { CSSProperties, FocusEventHandler } from "react";


type OptionsSelectBoxProps = {
  type: "static-options",
  options: SelectProps["options"] | any[];
  loadOptions:undefined;
}

type LoadOptionsSelectBoxProps = {
  type: "load-options",
  options: undefined;
  loadOptions: {
    url: string;
    getOptionSettings: { label: string; value: any };
  };
}

export type SelectBoxProps = {
  onChange: (value: any, objValue: any) => any | void;
  onSearch?: (value: any) => any | void;
  filterOption?: (value: any, value2: any) => any | void;
  onBlur?: FocusEventHandler<HTMLElement> | undefined;
  label: string;
  name: string;
  value: string | string[] | number | null | boolean;
  mode?: "multiple" | "tags";
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  iserror?: boolean;
  errtext?: string;
  required?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  suffixIcon?: null | JSX.Element;
} & (OptionsSelectBoxProps | LoadOptionsSelectBoxProps)
