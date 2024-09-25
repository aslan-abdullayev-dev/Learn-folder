import styles from "./ButtonElStyles.module.scss";

import { ButtonElProps } from "./ButtonElTypes.ts";

function ButtonEl(props: ButtonElProps): JSX.Element {
  const fallBack: ButtonElProps = {
    type: props.type ?? "button",
    text: props.text ?? "Click me",
    onClick: props.onClick ?? undefined,
    style: props.style ?? {},
    buttonType: props.buttonType ?? "default",
    className: props.className ?? "",
  };

  return (
    <button
      type={fallBack.type}
      className={
        `${styles.button} 
         ${styles[fallBack.buttonType]}
         ${fallBack.className}`
      }
      onClick={fallBack.onClick}
      style={fallBack.style}
    >
      {fallBack.text}
    </button>
  );
}

export default ButtonEl;
