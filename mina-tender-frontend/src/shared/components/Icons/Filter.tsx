import type { SVGProps } from "react";

const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 4.503c0-.369.298-.667.667-.667h6a.667.667 0 1 1 0 1.333h-6A.667.667 0 0 1 2 4.503M2 8.503c0-.369.298-.667.667-.667h4.666a.667.667 0 1 1 0 1.333H2.667A.667.667 0 0 1 2 8.503M2 12.503c0-.369.298-.667.667-.667h4.666a.667.667 0 0 1 0 1.333H2.667A.667.667 0 0 1 2 12.503M9.529 10.031c.26-.26.682-.26.943 0L12 11.56l1.529-1.529a.667.667 0 0 1 .943.943l-2 2a.667.667 0 0 1-.943 0l-2-2a.667.667 0 0 1 0-.943"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 3.836c.369 0 .667.298.667.667v8a.667.667 0 1 1-1.333 0v-8c0-.369.298-.667.666-.667"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFilter;
