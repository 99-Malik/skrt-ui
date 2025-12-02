"use client";

import React, { useState } from "react";

export default function Analytics() {
    const [hoveredTier, setHoveredTier] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
    const [locationMousePosition, setLocationMousePosition] = useState<{ x: number; y: number } | null>(null);
    const tierData = [
        { name: "Tier 1", percentage: 94.9, color: "#2A85FF" },
        { name: "Tier 2", percentage: 1.5, color: "#CABDFF" },
        { name: "Tier 3", percentage: 3.6, color: "#B5E4CA" },
    ];

    const locationData = [
        { name: "California", value: 95, color: "#B5E4CA", count: 2845 },
        { name: "Texas", value: 70, color: "#2A85FF", count: 1485 },
        { name: "New York", value: 55, color: "#B5E4CA", count: 1120 },
        { name: "Illinois", value: 40, color: "#B5E4CA", count: 890 },
        { name: "Washington", value: 30, color: "#B5E4CA", count: 650 },
        { name: "Ohio", value: 20, color: "#B5E4CA", count: 420 },
    ];

    // Calculate dynamic x-axis values based on data
    const maxValue = Math.max(...locationData.map(loc => loc.value));
    const getXAxisValues = () => {
        // Always start with 0%
        const intervals = [0];
        
        // If max value is close to 100, use standard intervals: 0, 40, 60, 100
        if (maxValue >= 90) {
            intervals.push(40, 60, 100);
        } else {
            // Calculate nice intervals based on max value
            // Round max up to nearest 10
            const maxRounded = Math.ceil(maxValue / 10) * 10;
            
            // Add intermediate values (40%, 60% if they're less than max)
            if (40 < maxRounded) intervals.push(40);
            if (60 < maxRounded) intervals.push(60);
            
            // Always include the max rounded value
            intervals.push(maxRounded);
        }
        
        // Remove duplicates and sort
        return [...new Set(intervals)].sort((a, b) => a - b);
    };

    const xAxisValues = getXAxisValues();

    // Calculate donut chart paths
    const donutSize = 320;
    const donutRadius = 130;
    const donutStrokeWidth = 24;
    const centerX = donutSize / 2;
    const centerY = donutSize / 2;

    const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(endAngleRad);
        const y2 = centerY + radius * Math.sin(endAngleRad);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    let currentAngle = -90; // Start from top
    const donutPaths = tierData.map((tier) => {
        const percentage = tier.percentage;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        const path = getArcPath(startAngle, endAngle, donutRadius);

        return { path, color: tier.color, percentage: tier.percentage, name: tier.name };
    });

    // Format percentage display
    const formatPercentage = (value: number) => {
        if (value % 1 === 0) {
            return value.toFixed(1); // Show 4.0 instead of 4
        }
        return value.toFixed(2); // Show 2.15
    };

    return (
        <div className="space-y-8 font-sans w-full">
            {/* Tier Usage Performance */}
            <div className="bg-[#FCFCFC] rounded-2xl border border-gray-100 p-6 min-h-[400px] flex flex-col">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-4 h-8 bg-[#25C889] rounded-md"></div>
                    <h2 className="text-lg font-semibold text-gray-800">Tier Usage Performance</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative">
                    {/* Donut Chart */}
                    <div 
                        className="relative"
                        onMouseMove={(e) => {
                            if (hoveredTier !== null) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMousePosition({
                                    x: e.clientX - rect.left,
                                    y: e.clientY - rect.top,
                                });
                            }
                        }}
                        onMouseLeave={() => {
                            setHoveredTier(null);
                            setMousePosition(null);
                        }}
                    >
                        <svg width={donutSize} height={donutSize} viewBox={`0 0 ${donutSize} ${donutSize}`} className="transform -rotate-90">
                            {donutPaths.map((segment, index) => (
                                <g key={index}>
                                    {/* White border for overlapping segments (Tier 2 and Tier 3) */}
                                    {index > 0 && (
                                        <path
                                            d={segment.path}
                                            fill="none"
                                            stroke="white"
                                            strokeWidth={donutStrokeWidth + 6}
                                            strokeLinecap="round"
                                            className="pointer-events-none"
                                        />
                                    )}
                                    {/* Main colored segment */}
                                    <path
                                        d={segment.path}
                                        fill="none"
                                        stroke={segment.color}
                                        strokeWidth={donutStrokeWidth}
                                        strokeLinecap="round"
                                        className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.closest('div')?.getBoundingClientRect();
                                            if (rect) {
                                                setMousePosition({
                                                    x: e.clientX - rect.left,
                                                    y: e.clientY - rect.top,
                                                });
                                            }
                                            setHoveredTier(index);
                                        }}
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.closest('div')?.getBoundingClientRect();
                                            if (rect) {
                                                setMousePosition({
                                                    x: e.clientX - rect.left,
                                                    y: e.clientY - rect.top,
                                                });
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredTier(null);
                                            setMousePosition(null);
                                        }}
                                    />
                                </g>
                            ))}
                        </svg>

                        {/* Tooltip */}
                        {hoveredTier !== null && mousePosition && (
                            <div 
                                className="absolute bg-[#1F2937] text-white text-xs rounded-lg py-2 px-3 shadow-lg pointer-events-none z-10 min-w-[100px]"
                                style={{
                                    left: `${mousePosition.x}px`,
                                    top: `${mousePosition.y - 60}px`,
                                    transform: 'translateX(-50%)',
                                }}
                            >
                                <div className="text-gray-400 mb-1 text-[10px]">Sep 30 - Oct 7</div>
                                <div className="flex items-center gap-2 font-medium">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: tierData[hoveredTier].color }}
                                    ></div>
                                    {tierData[hoveredTier].name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 flex items-center justify-between px-4">
                    {tierData.map((tier, index) => (
                        <div key={index} className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: tier.color }}
                                ></div>
                                <span className="text-sm text-gray-500">{tier.name}</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900 ml-5">{formatPercentage(tier.percentage)}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Assistance Locations */}
            <div className="bg-[#FCFCFC] rounded-2xl border border-gray-100 p-6 relative">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-4 h-8 bg-[#CABDFF] rounded-md"></div>
                    <h2 className="text-lg font-semibold text-[#1F2937]">Top Assistance Locations</h2>
                </div>

                {/* Horizontal Bar Chart with Grid Lines */}
                <div className="relative">
                    {/* Bar Chart Container */}
                    <div className="relative pl-24">
                        {/* Grid Lines - extend through entire chart area (dynamic based on x-axis values) */}
                        <div className="absolute left-24 right-0 top-0 bottom-0 pointer-events-none">
                            {xAxisValues.map((value, index) => (
                                <div 
                                    key={index}
                                    className="absolute top-0 bottom-0 w-px bg-[#efefef]"
                                    style={{ left: `${value}%` }}
                                ></div>
                            ))}
                        </div>

                        {/* Bar Chart */}
                        <div 
                            className="space-y-4 relative"
                            onMouseMove={(e) => {
                                if (hoveredLocation !== null) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setLocationMousePosition({
                                        x: e.clientX - rect.left,
                                        y: e.clientY - rect.top,
                                    });
                                }
                            }}
                            onMouseLeave={() => {
                                setHoveredLocation(null);
                                setLocationMousePosition(null);
                            }}
                        >
                            {locationData.map((location, index) => (
                                <div key={index} className="flex items-center">
                                    {/* State Name on Left */}
                                    <div className="w-24 shrink-0 -ml-24">
                                        <span className="text-sm font-normal text-[#6F767E]">{location.name}</span>
                                    </div>
                                    
                                    {/* Bar on Right */}
                                    <div className="flex-1 relative">
                                        <div 
                                            className="relative w-full h-8 bg-transparent rounded-xs overflow-hidden cursor-pointer"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.closest('div')?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
                                                if (rect) {
                                                    setLocationMousePosition({
                                                        x: e.clientX - rect.left,
                                                        y: e.clientY - rect.top,
                                                    });
                                                }
                                                setHoveredLocation(index);
                                            }}
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.closest('div')?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
                                                if (rect) {
                                                    setLocationMousePosition({
                                                        x: e.clientX - rect.left,
                                                        y: e.clientY - rect.top,
                                                    });
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredLocation(null);
                                                setLocationMousePosition(null);
                                            }}
                                        >
                                            <div
                                                className="h-full rounded-xs transition-all"
                                                style={{
                                                    width: `${location.value}%`,
                                                    backgroundColor: location.color,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* X-axis Labels - positioned to align exactly with grid lines (dynamic) */}
                    <div className="relative mt-2 pt-4 border-t border-gray-200">
                        <div className="relative pl-24">
                            <div className="absolute left-24 right-0">
                                {xAxisValues.map((value, index) => (
                                    <span 
                                        key={index}
                                        className="text-xs text-[#6B7280] absolute transform -translate-x-1/2"
                                        style={{ left: `${value}%` }}
                                    >
                                        {value}%
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredLocation !== null && locationMousePosition && (
                        <div 
                            className="absolute bg-[#1F2937] text-white text-xs rounded-lg py-2 px-3 shadow-lg pointer-events-none z-10 min-w-[120px]"
                            style={{
                                left: `${locationMousePosition.x}px`,
                                top: `${locationMousePosition.y + 20}px`,
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <div className="text-gray-400 mb-1 text-[10px]">Sep 30 - Oct 7</div>
                            <div className="flex items-center gap-2 font-medium">
                                <div
                                    className="w-2 h-2 rounded"
                                    style={{ backgroundColor: locationData[hoveredLocation].color }}
                                ></div>
                                {locationData[hoveredLocation].name}: {locationData[hoveredLocation].count.toLocaleString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

