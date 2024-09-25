import { CSSProperties } from "react";

export interface SearchbarProps {
  onSearch?: (props: any) => any | void;
  onChange?: (props: any) => any | void;
  placeholder?: string;
  style?: CSSProperties;
  size?: "small" | "middle" | "large";
  allowClear?: boolean
  enterButton?: string | JSX.Element
  value: string
}
