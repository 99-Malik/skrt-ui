"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GreenBackgroundSvg from "../Svgs/BackGround";

export default function ForgotPassword() {
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
                        Forgot Password
                    </h2>
                    <p className="text-[#6B7280] text-sm max-w-xs mx-auto leading-relaxed">
                        You don't have to worry about forgetting your password.
                    </p>
                </div>

                {/* Form */}
                <div className="w-full max-w-md space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#1F2937]"
                        >
                            Enter Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent transition-all text-sm placeholder-gray-400 bg-white"
                        />
                    </div>

                    {/* Get Code Button */}
                    <button
                        onClick={() => router.push("/sign-in/enter-code")}
                        className="w-full bg-[#25C889] text-white font-bold py-3.5 rounded-lg hover:bg-[#1eb378] transition-colors shadow-sm"
                    >
                        Get Code
                    </button>
                </div>
            </div>
        </div>
    );
}
