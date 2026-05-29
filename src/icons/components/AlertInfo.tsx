import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

function AlertInfo({ width = 20, height = 20, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      width={width}
      height={height}
      aria-hidden="true"
      {...props}
    >
      <circle cx={10} cy={10} r={7.5} stroke="currentColor" strokeWidth={1.5} />
      <path d="M10 9V14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={10} cy={6.5} r={0.75} fill="currentColor" />
    </svg>
  );
}

export default AlertInfo;
