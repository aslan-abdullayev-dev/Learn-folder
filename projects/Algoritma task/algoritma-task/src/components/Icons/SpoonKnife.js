import * as React from "react";
function SvgSpoonKnife(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M7 0C3.686 0 1 3.134 1 7c0 3.31 1.969 6.083 4.616 6.812l-.993 16.191a1.863 1.863 0 001.878 1.996h1c1.1 0 1.945-.898 1.878-1.996l-.993-16.191c2.646-.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zm20.167 0L25.5 10h-1.25l-.833-10h-.833l-.833 10h-1.25L18.834 0h-.833v13a1 1 0 001 1h2.604l-.982 16.004A1.863 1.863 0 0022.501 32h1c1.1 0 1.945-.898 1.878-1.996L24.397 14h2.604a1 1 0 001-1V0h-.833z" />
    </svg>
  );
}
export default SvgSpoonKnife;
