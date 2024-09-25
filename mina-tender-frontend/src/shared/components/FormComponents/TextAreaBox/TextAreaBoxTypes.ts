export interface TextAreaProps {
  value: string;
  label?: string;
  name?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  iserror?: boolean;
  errtext?: string;
  onChange: (props: any) => any | void;
  onBlur?: (props: any) => any | void;
}
