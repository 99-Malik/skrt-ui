"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GreenBackgroundSvg from "../Svgs/BackGround";

export default function EnterCode() {
    const router = useRouter();
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans text-[#1A1A1A]">
            {/* Background SVG */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <GreenBackgroundSvg />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/skrt-logo.png"
                            alt="SKRT Logo"
                            width={110}
                            height={50}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-[#1F2937] mb-3">
                        Enter Code
                    </h2>
                    <p className="text-[#6B7280] text-sm max-w-xs mx-auto leading-relaxed">
                        Check your mail and enter PIN
                    </p>
                </div>

                {/* Form */}
                <div className="w-full max-w-md space-y-6">
                    {/* PIN Input Section */}
                    <div className="space-y-2 text-center">
                        <label className="block text-sm font-semibold text-[#1F2937] mb-4 text-left">
                            Check your mail and enter PIN
                        </label>
                        <div className="flex justify-between gap-3 mb-2">
                            {[1, 2, 3, 4].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="w-full aspect-square max-w-[80px] text-center text-3xl font-medium rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent transition-all bg-white"
                                />
                            ))}
                        </div>
                        <p className="text-[#6B7280] text-xs text-left">
                            Enter Code to Continue or continue
                        </p>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={() => router.push("/sign-in/reset-password")}
                        className="w-full bg-[#25C889] text-white font-bold py-3.5 rounded-lg hover:bg-[#1eb378] transition-colors shadow-sm"
                    >
                        Continue to login
                    </button>
                </div>
            </div>
        </div>
    );
}
