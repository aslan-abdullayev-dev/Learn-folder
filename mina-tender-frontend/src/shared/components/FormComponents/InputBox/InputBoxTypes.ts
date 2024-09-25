export interface InputBoxProps {
  value: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isfake?: boolean;
  type?: string;
  iserror?: boolean;
  errtext?: string;
  onChange: (props: any) => any | void;
  onBlur?: (props: any) => any | void;
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  size?: "small" | "middle" | "large";
}
