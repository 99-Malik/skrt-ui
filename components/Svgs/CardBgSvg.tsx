import React from "react";

const GradientCard = ({
  startColor = "#FFFFFF",
  endColor = "#019BF4",
  opacity = 0.55,
  width = 360,
  height = 128,
  radius = 16,
  ...props
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`;
  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base white rectangle */}
      <rect
        x="0.5"
        y="0.5"
        width={viewBoxWidth - 1}
        height={viewBoxHeight - 1}
        rx={radius}
        fill="white"
      />

      {/* Gradient layer */}
      <rect
        x="0.5"
        y="0.5"
        width={viewBoxWidth - 1}
        height={viewBoxHeight - 1}
        rx={radius}
        fill={`url(#${gradientId})`}
        fillOpacity={opacity}
      />

      {/* Border */}
      <rect
        x="0.5"
        y="0.5"
        width={viewBoxWidth - 1}
        height={viewBoxHeight - 1}
        rx={radius}
        stroke="#E9EAEA"
      />

      <defs>
        <linearGradient
          id={gradientId}
          x1={viewBoxWidth / 2}
          y1={viewBoxHeight}
          x2={viewBoxWidth * 0.9}
          y2={-viewBoxHeight * 3}
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
