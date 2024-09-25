import { CSSProperties } from "react";

export interface ButtonElProps {
  buttonType: "default" | "formSubmit" | "formCancel" | "authSubmit";
  type?: "button" | "submit" | "reset";
  onClick?: (props: any) => any | void;
  style?: CSSProperties;
  text?: string | JSX.Element | null;
  className?: string;
}
