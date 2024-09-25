import { SwitchElProps } from "../SwitchEl/SwitchElTypes.ts";

export interface switchBoxProps extends SwitchElProps {
  label: string;
  required?: boolean;
  mean?: Mean;
  iserror?: boolean;
  errtext?: string;
  name: string;
}

type Mean = {
  true: string;
  false: string;
}