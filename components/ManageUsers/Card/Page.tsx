"use client";

import React from "react";
import GradientCard from "@/components/Svgs/CardBgSvg";

interface CardProps {
    title: string;
    count: string | number;
    icon: React.ComponentType<{ size?: number; className?: string }> | React.ReactNode;
    variant: "green" | "blue" | "red";
}

export default function Card({ title, count, icon, variant }: CardProps) {
    const variants = {
        green: {
            gradientColor: "#25C889",
            iconColor: "text-[#25C889]",
        },
        blue: {
            gradientColor: "#00A3FF",
            iconColor: "text-[#00A3FF]",
        },
        red: {
            gradientColor: "#FF4D4F",
            iconColor: "text-[#FF4D4F]",
        },
    };

    const style = variants[variant];

    return (
        <div className="rounded-2xl p-6 flex flex-col justify-between h-32 min-w-[240px] relative overflow-hidden">
            {/* Background SVG */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <GradientCard
                    startColor="#FFFFFF"
                    endColor={style.gradientColor}
                    opacity={0.55}
                    width={400}
                    height={128}
                    radius={16}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                    {React.isValidElement(icon) ? (
                        <div className={style.iconColor}>{icon}</div>
                    ) : (
                        React.createElement(icon as React.ComponentType<{ size?: number; className?: string }>, { 
                            size: 20, 
                            className: style.iconColor 
                        })
                    )}
                    <span className="text-[#6B7280] text-sm font-normal">{title}</span>
                </div>
                <div className="text-2xl font-semibold text-[#1F2937]">{count}</div>
            </div>
        </div>
    );
}
