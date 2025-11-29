"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";

interface NavbarProps {
    title?: string;
}

export default function Navbar({ title = "Manage Users" }: NavbarProps) {
    const [imageError, setImageError] = useState(false);
    const userName = "John Will Palinsky";
    const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John+Will+Palinsky";

    return (
        <div className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-100 font-sans">
            {/* Left Section - Back Button & Title */}
            <div className="flex items-center gap-4">
                {/* Back Button */}

            
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg ">
                {/* Avatar */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {imageError ? (
                        <span className="text-xs font-bold text-[#6B7280]">
                            {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                    ) : (
                        <Image
                            src={avatarUrl}
                            alt="User Avatar"
                            fill
                            className="object-cover"
                            onError={() => setImageError(true)}
                            unoptimized
                        />
                    )}
                </div>

                {/* User Info */}
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-[#1F2937] leading-tight">
                        {userName}
                    </span>
                    <span className="text-xs text-[#6B7280] font-medium">
                        Super Admin
                    </span>
                </div>

                {/* Dropdown Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.80752 9.75H16.1925C16.3409 9.75062 16.4857 9.79521 16.6087 9.87813C16.7316 9.96106 16.8273 10.0786 16.8835 10.2159C16.9397 10.3531 16.9539 10.504 16.9244 10.6493C16.8948 10.7947 16.8228 10.928 16.7175 11.0325L12.5325 15.2175C12.4628 15.2878 12.3799 15.3436 12.2885 15.3817C12.1971 15.4197 12.099 15.4393 12 15.4393C11.901 15.4393 11.803 15.4197 11.7116 15.3817C11.6202 15.3436 11.5372 15.2878 11.4675 15.2175L7.28252 11.0325C7.17721 10.928 7.10523 10.7947 7.07569 10.6493C7.04615 10.504 7.06038 10.3531 7.11657 10.2159C7.17277 10.0786 7.26841 9.96106 7.39139 9.87813C7.51438 9.79521 7.6592 9.75062 7.80752 9.75Z" fill="#727A90" />
                </svg>
            </div>
        </div>
    );
}
