import React from "react";

const GradientCard = ({
  startColor = "#FFFFFF",
  endColor = "#019BF4",
  opacity = 0.55,
  width = 360,
  height = 104,
  radius = 20,
  ...props
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base white rectangle */}
      <rect
        x="0.5"
        y="0.5"
        width={width - 1}
        height={height - 1}
        rx={radius}
        fill="white"
      />

      {/* Gradient layer */}
      <rect
        x="0.5"
        y="0.5"
        width={width - 1}
        height={height - 1}
        rx={radius}
        fill={`url(#${gradientId})`}
        fillOpacity={opacity}
      />

      {/* Border */}
      <rect
        x="0.5"
        y="0.5"
        width={width - 1}
        height={height - 1}
        rx={radius}
        stroke="#E9EAEA"
      />

      <defs>
        <linearGradient
          id={gradientId}
          x1={width / 2}
          y1={height}
          x2={width * 0.9}
          y2={-height * 3}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor={startColor} />
          <stop offset="1" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientCard;
