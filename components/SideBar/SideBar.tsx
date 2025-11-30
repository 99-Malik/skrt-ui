"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import {
    ManageUsersIcon,
    ManageServicesIcon,
    ManageFinanceIcon,
    ManageRolesIcon,
    ManageDisputesIcon,
    ManageTaxationIcon,
    SettingsIcon,
} from "@/components/Svgs/SideBarSvg";

export default function SideBar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Manage Users", icon: ManageUsersIcon, href: "/manage-users", width: 20, height: 20 },
        { name: "Manage Services", icon: ManageServicesIcon, href: "/manage-services", width: 22, height: 22 },
        { name: "Manage Finance", icon: ManageFinanceIcon, href: "#", width: 20, height: 20 },
        { name: "Manage Roles", icon: ManageRolesIcon, href: "#", width: 20, height: 20 },
        { name: "Manage Disputes", icon: ManageDisputesIcon, href: "#", width: 20, height: 20 },
        { name: "Manage Taxation", icon: ManageTaxationIcon, href: "#", width: 20, height: 20 },
        { name: "Settings", icon: SettingsIcon, href: "#", width: 20, height: 20 },
    ];

    // Sort by href length (longest first) to prioritize more specific routes
    const sortedMenuItems = [...menuItems].sort((a, b) => {
        if (a.href === "#" || b.href === "#") return 0;
        return b.href.length - a.href.length;
    });

    // Find the active item (most specific match)
    const getActiveItem = () => {
        // First check for exact match
        const exactMatch = menuItems.find(item => pathname === item.href);
        if (exactMatch) return exactMatch.href;
        
        // Then check for pathname starting with href (prioritizing longer paths)
        for (const item of sortedMenuItems) {
            if (item.href !== "#" && pathname?.startsWith(item.href)) {
                // Ensure it's a proper path segment (ends with / or is end of string)
                const nextChar = pathname[item.href.length];
                if (!nextChar || nextChar === '/') {
                    return item.href;
                }
            }
        }
        return null;
    };

    const activeHref = getActiveItem();

    return (
        <div className="flex flex-col h-screen w-64 bg-white font-sans border-r border-gray-100">
            {/* Header - Fixed height to match Navbar, with bottom border only */}
            <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
                {/* Logo */}
                <div className="flex flex-col items-start">
                    <div className="flex gap-1 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#25C889]"></div>
                    </div>
                    <span className="text-xl font-normal tracking-[0.2em] text-[#1F2937]">
                        SKRT
                    </span>
                </div>
                {/* Collapse Button */}
                <button className="p-1.5 cursor-pointer ">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="#F1F2F4" />
                        <path d="M16.86 20.3934L13.14 16.6667C13.0159 16.5418 12.9462 16.3729 12.9462 16.1967C12.9462 16.0206 13.0159 15.8516 13.14 15.7267L16.86 12.0001C16.9533 11.906 17.0724 11.8419 17.2022 11.8159C17.3321 11.7898 17.4667 11.803 17.589 11.8538C17.7113 11.9046 17.8157 11.9906 17.8889 12.101C17.9621 12.2113 18.0008 12.341 18 12.4734V19.9201C18.0008 20.0525 17.9621 20.1821 17.8889 20.2925C17.8157 20.4028 17.7113 20.4889 17.589 20.5396C17.4667 20.5904 17.3321 20.6036 17.2022 20.5776C17.0724 20.5515 16.9533 20.4874 16.86 20.3934Z" fill="#727A90" />
                    </svg>

                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 h-full p-4 overflow-y-auto">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeHref === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${isActive
                                ? "bg-[#25C889] text-white"
                                : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1F2937]"
                                }`}
                        >
                            {React.createElement(IconComponent, { 
                                active: isActive, 
                                width: item.width, 
                                height: item.height 
                            })}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="mt-auto p-4 pt-0">
                <button className="w-full flex items-center justify-center gap-2 bg-[#FF4D4F] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#ff3538] transition-colors shadow-sm">
                    <LogOut size={18} className="rotate-180" />
                    Logout
                </button>
            </div>
        </div>
    );
}
