export type DatePickerBoxType = {
  label: string;
  iserror?: boolean;
  errtext?: string;
  required?: boolean;
  allowClear?: boolean;
  name?: string;
  onChange: (dateString: string | string[]) => any | void; // set new value here
  onBlur?: (props: any) => any | void;
  value: any;
  type?: PickerType;
};

export type PickerType = "time" | "date" | "datetime";
