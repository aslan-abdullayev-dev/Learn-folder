export interface IconPickerBoxProps {
  label: string;
  required?: boolean;
  iserror?: boolean;
  errtext?: string;
  value: string;
  onChange: (val: string) => void;
  name: string;
}
