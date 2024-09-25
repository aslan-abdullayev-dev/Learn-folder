import type { SVGProps } from "react";
const SvgCornerDownRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      stroke="#354052"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 6.5v6a3 3 0 0 0 3 3h10m0 0-4-4m4 4-4 4"
    />
  </svg>
);
export default SvgCornerDownRight;
