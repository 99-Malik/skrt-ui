"use client";

import React, { useMemo } from "react";

interface CardProps {
    title: string;
    dateRange: string;
    value: string;
    percentage: string;
    trend: "up" | "down";
    trendValue: string;
    chartColor?: string;
    iconColor?: string;
    chartData?: number[];
    iconType?: "money" | "wallet" | "card";
}

// Generate default chart data if not provided
const generateDefaultChartData = (type: "up" | "down"): number[] => {
    const data: number[] = [];
    const baseValue = 50;
    const points = 10;

    for (let i = 0; i < points; i++) {
        if (type === "up") {
            // Upward trend with fluctuations
            const value = baseValue + (i * 5) + Math.sin(i * 0.8) * 10 + Math.random() * 5;
            data.push(Math.max(10, Math.min(90, value)));
        } else {
            // Downward trend with fluctuations
            const value = baseValue - (i * 3) + Math.sin(i * 0.8) * 8 + Math.random() * 5;
            data.push(Math.max(10, Math.min(90, value)));
        }
    }
    return data;
};

export default function Card({
    title,
    dateRange,
    value,
    percentage,
    trend,
    trendValue,
    chartColor = "#10B981",
    iconColor,
    chartData,
    iconType = "money",
}: CardProps) {
    const isPositive = trend === "up";
    const trendColor = isPositive ? "text-[#009499]" : "text-[#EF4444]";
    const trendIcon = isPositive ? "▲" : "▼";
    const iconBgColor = iconColor || chartColor;

    // Use provided chart data or generate default
    const data = useMemo(() => {
        return chartData || generateDefaultChartData(trend);
    }, [chartData, trend]);

    // Normalize data to fit chart area (0-100 width, 0-40 height)
    const normalizedData = useMemo(() => {
        if (data.length === 0) return [];
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        return data.map((val) => {
            // Invert Y so higher values are at top (SVG Y increases downward)
            const normalized = ((val - min) / range) * 30 + 5;
            return 40 - normalized; // Invert for SVG coordinate system
        });
    }, [data]);

    // Generate smooth curved path for area chart
    const areaPath = useMemo(() => {
        if (normalizedData.length === 0) return "";

        const width = 100;
        const height = 40;
        const stepX = width / (normalizedData.length - 1);

        let path = `M 0 ${height} `; // Start at bottom left
        path += `L 0 ${normalizedData[0]} `; // Move to first data point

        // Create smooth curve using cubic bezier for cleaner look
        for (let i = 0; i < normalizedData.length - 1; i++) {
            const x1 = i * stepX;
            const y1 = normalizedData[i];
            const x2 = (i + 1) * stepX;
            const y2 = normalizedData[i + 1];

            // Control points for smooth curve
            const cp1X = x1 + stepX * 0.5;
            const cp1Y = y1;
            const cp2X = x2 - stepX * 0.5;
            const cp2Y = y2;

            path += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x2} ${y2} `;
        }

        path += `L ${width} ${height} Z`; // Close path to bottom right

        return path;
    }, [normalizedData]);

    // Generate smooth curved line path
    const linePath = useMemo(() => {
        if (normalizedData.length === 0) return "";

        const width = 100;
        const stepX = width / (normalizedData.length - 1);

        let path = `M 0 ${normalizedData[0]} `;

        // Create smooth curve using cubic bezier for cleaner look
        for (let i = 0; i < normalizedData.length - 1; i++) {
            const x1 = i * stepX;
            const y1 = normalizedData[i];
            const x2 = (i + 1) * stepX;
            const y2 = normalizedData[i + 1];

            // Control points for smooth curve
            const cp1X = x1 + stepX * 0.5;
            const cp1Y = y1;
            const cp2X = x2 - stepX * 0.5;
            const cp2Y = y2;

            path += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x2} ${y2} `;
        }

        return path;
    }, [normalizedData]);

    // Icon components
    const renderIcon = () => {
        const iconSize = 18;
        switch (iconType) {
            case "money":
                // Money bill icon
                return (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#25C889" fill-opacity="0.1" />
                        <path d="M25.25 14H14.75C13.7558 14.0012 12.8027 14.3967 12.0997 15.0997C11.3967 15.8027 11.0012 16.7558 11 17.75V22.25C11.0012 23.2442 11.3967 24.1973 12.0997 24.9003C12.8027 25.6033 13.7558 25.9988 14.75 26H25.25C26.2442 25.9988 27.1973 25.6033 27.9003 24.9003C28.6033 24.1973 28.9988 23.2442 29 22.25V17.75C28.9988 16.7558 28.6033 15.8027 27.9003 15.0997C27.1973 14.3967 26.2442 14.0012 25.25 14ZM14 23.75C13.8517 23.75 13.7067 23.706 13.5833 23.6236C13.46 23.5412 13.3639 23.4241 13.3071 23.287C13.2503 23.15 13.2355 22.9992 13.2644 22.8537C13.2933 22.7082 13.3648 22.5746 13.4697 22.4697C13.5746 22.3648 13.7082 22.2934 13.8537 22.2644C13.9992 22.2355 14.15 22.2503 14.287 22.3071C14.4241 22.3639 14.5412 22.46 14.6236 22.5833C14.706 22.7067 14.75 22.8517 14.75 23C14.75 23.1989 14.671 23.3897 14.5303 23.5303C14.3897 23.671 14.1989 23.75 14 23.75ZM14 17.75C13.8517 17.75 13.7067 17.706 13.5833 17.6236C13.46 17.5412 13.3639 17.4241 13.3071 17.287C13.2503 17.15 13.2355 16.9992 13.2644 16.8537C13.2933 16.7082 13.3648 16.5746 13.4697 16.4697C13.5746 16.3648 13.7082 16.2933 13.8537 16.2644C13.9992 16.2355 14.15 16.2503 14.287 16.3071C14.4241 16.3639 14.5412 16.46 14.6236 16.5833C14.706 16.7067 14.75 16.8517 14.75 17C14.75 17.1989 14.671 17.3897 14.5303 17.5303C14.3897 17.671 14.1989 17.75 14 17.75ZM20 23C19.4067 23 18.8266 22.8241 18.3333 22.4944C17.8399 22.1648 17.4554 21.6962 17.2284 21.1481C17.0013 20.5999 16.9419 19.9967 17.0576 19.4147C17.1734 18.8328 17.4591 18.2982 17.8787 17.8787C18.2982 17.4591 18.8328 17.1734 19.4147 17.0576C19.9967 16.9419 20.5999 17.0013 21.1481 17.2284C21.6962 17.4554 22.1648 17.8399 22.4944 18.3333C22.8241 18.8266 23 19.4067 23 20C23 20.7956 22.6839 21.5587 22.1213 22.1213C21.5587 22.6839 20.7956 23 20 23ZM26 23.75C25.8517 23.75 25.7067 23.706 25.5833 23.6236C25.46 23.5412 25.3639 23.4241 25.3071 23.287C25.2503 23.15 25.2355 22.9992 25.2644 22.8537C25.2934 22.7082 25.3648 22.5746 25.4697 22.4697C25.5746 22.3648 25.7082 22.2934 25.8537 22.2644C25.9992 22.2355 26.15 22.2503 26.287 22.3071C26.4241 22.3639 26.5412 22.46 26.6236 22.5833C26.706 22.7067 26.75 22.8517 26.75 23C26.75 23.1989 26.671 23.3897 26.5303 23.5303C26.3897 23.671 26.1989 23.75 26 23.75ZM26 17.75C25.8517 17.75 25.7067 17.706 25.5833 17.6236C25.46 17.5412 25.3639 17.4241 25.3071 17.287C25.2503 17.15 25.2355 16.9992 25.2644 16.8537C25.2934 16.7082 25.3648 16.5746 25.4697 16.4697C25.5746 16.3648 25.7082 16.2933 25.8537 16.2644C25.9992 16.2355 26.15 16.2503 26.287 16.3071C26.4241 16.3639 26.5412 16.46 26.6236 16.5833C26.706 16.7067 26.75 16.8517 26.75 17C26.75 17.1989 26.671 17.3897 26.5303 17.5303C26.3897 17.671 26.1989 17.75 26 17.75ZM21.5 20C21.5 20.2967 21.412 20.5867 21.2472 20.8334C21.0824 21.08 20.8481 21.2723 20.574 21.3858C20.2999 21.4994 19.9983 21.5291 19.7074 21.4712C19.4164 21.4133 19.1491 21.2704 18.9393 21.0607C18.7296 20.8509 18.5867 20.5836 18.5288 20.2926C18.4709 20.0017 18.5006 19.7001 18.6142 19.426C18.7277 19.1519 18.92 18.9176 19.1666 18.7528C19.4133 18.588 19.7033 18.5 20 18.5C20.3978 18.5 20.7794 18.658 21.0607 18.9393C21.342 19.2206 21.5 19.6022 21.5 20Z" fill="#25C889" />
                    </svg>

                );
            case "wallet":
                // Wallet icon
                return (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#FEEFEC" />
                        <path d="M26.75 15.5H14.75C14.1057 15.5 13.496 15.221 13.0738 14.7507C13.4863 14.2902 14.0855 14 14.75 14H28.25C29.231 13.9955 29.2303 12.5037 28.25 12.5H14.75C12.6793 12.5 11 14.1793 11 16.25V23.75C11 25.8207 12.6793 27.5 14.75 27.5H26.75C27.9927 27.5 29 26.4927 29 25.25V17.75C29 16.5073 27.9927 15.5 26.75 15.5ZM26 22.25C25.019 22.2455 25.019 20.7545 26 20.75C26.981 20.7545 26.981 22.2455 26 22.25Z" fill="#F05D3D" />
                    </svg>

                );
            case "card":
                // Credit card icon
                return (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#E6F4F5" />
                        <path d="M25.25 13.25H14.75C13.7558 13.2512 12.8027 13.6467 12.0997 14.3497C11.3967 15.0527 11.0012 16.0058 11 17H29C28.9988 16.0058 28.6033 15.0527 27.9003 14.3497C27.1973 13.6467 26.2442 13.2512 25.25 13.25Z" fill="#009499" />
                        <path d="M11 23C11.0012 23.9942 11.3967 24.9473 12.0997 25.6503C12.8027 26.3533 13.7558 26.7488 14.75 26.75H25.25C26.2442 26.7488 27.1973 26.3533 27.9003 25.6503C28.6033 24.9473 28.9988 23.9942 29 23V18.5H11V23ZM16.25 22.625C16.25 22.8475 16.184 23.065 16.0604 23.25C15.9368 23.435 15.7611 23.5792 15.5555 23.6644C15.35 23.7495 15.1238 23.7718 14.9055 23.7284C14.6873 23.685 14.4868 23.5778 14.3295 23.4205C14.1722 23.2632 14.065 23.0627 14.0216 22.8445C13.9782 22.6262 14.0005 22.4 14.0856 22.1945C14.1708 21.9889 14.315 21.8132 14.5 21.6896C14.685 21.566 14.9025 21.5 15.125 21.5C15.4234 21.5 15.7095 21.6185 15.9205 21.8295C16.1315 22.0405 16.25 22.3266 16.25 22.625Z" fill="#009499" />
                    </svg>

                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl w-full order border border-[#E9EAEA] flex flex-col justify-between h-[244px]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-900 font-semibold text-base">{title}</h3>
                    <p className="text-[#727A90] font-medium text-xs mt-1">{dateRange}</p>
                </div>
                {/* Icon in top right corner */}
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                >
                    {renderIcon()}
                </div>
            </div>

            <div className="flex items-end justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="text-2xl font-semibold text-gray-900 mb-2">{value}</div>
                    <div className="flex items-center text-xs font-medium">
                        <span className={`${trendColor} flex items-center gap-1`}>
                        {trendIcon}   {percentage} 
                        </span>
                        <span className={`text-[#727a90] ml-1 flex items-center gap-1`}> {trendValue}</span>
                    </div>
                </div>

                {/* Area Chart */}
                <div className="w-24 h-12 shrink-0">
                    <svg
                        viewBox="0 0 100 40"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id={`gradient-${chartColor.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={chartColor} stopOpacity="0.15" />
                                <stop offset="100%" stopColor={chartColor} stopOpacity="0.02" />
                            </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <path
                            d={areaPath}
                            fill={`url(#gradient-${chartColor.replace('#', '')})`}
                        />
                        {/* Line */}
                        <path
                            d={linePath}
                            fill="none"
                            stroke={chartColor}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
