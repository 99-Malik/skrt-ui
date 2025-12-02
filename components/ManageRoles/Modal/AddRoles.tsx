"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";

interface AddRolesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (email: string, role: string) => void;
}

const roles = ["Editor", "Viewer", "Contributor", "Manager"];

const roleDescriptions: { [key: string]: string } = {
    Editor: "Editors have full access to edit and manage content",
    Viewer: "Viewers have only view access to admin features",
    Contributor: "Contributors can create and edit their own content",
    Manager: "Managers have administrative access to all features",
};

export default function AddRolesModal({ isOpen, onClose, onAdd }: AddRolesModalProps) {
    const [email, setEmail] = useState("abc232@gmail.com");
    const [selectedRole, setSelectedRole] = useState("Viewer");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const scrollableContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Scroll to bottom when dropdown opens for neat effect
            setTimeout(() => {
                if (scrollableContentRef.current) {
                    scrollableContentRef.current.scrollTo({
                        top: scrollableContentRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        setEmail("abc232@gmail.com");
        setSelectedRole("Viewer");
        setIsDropdownOpen(false);
        onClose();
    };

    const handleAdd = () => {
        if (email.trim()) {
            onAdd(email, selectedRole);
            handleClose();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900/50 z-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide">
                <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col relative my-auto">
                    {/* Header */}
                    <div className="shrink-0 p-6 pb-4 border-b border-gray-100">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors z-10"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-[#1F2937] mb-1 pr-8">Add Role</h2>
                        <p className="text-sm text-[#6B7280]">
                            Add service in teir 1 and update its pricing
                        </p>
                    </div>

                    {/* Scrollable Content */}
                    <div ref={scrollableContentRef} className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc232@gmail.com"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div className={`mb-4 ${isDropdownOpen ? 'pb-20' : ''}`}>
                            <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                Role
                            </label>
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-[#1F2937] cursor-pointer hover:bg-gray-50 w-full overflow-hidden h-10"
                                >
                                    <span className="truncate px-4 py-2 flex-1 h-full flex items-center">{selectedRole}</span>
                                    <div className="h-full border-l border-gray-200 bg-gray-50 px-2 flex items-center shrink-0">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-transform shrink-0 ${isDropdownOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                        </svg>
                                    </div>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                                        <div className="py-1">
                                            {roles.map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => {
                                                        setSelectedRole(role);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedRole === role
                                                        ? "text-[#25C889] font-medium bg-gray-50"
                                                        : "text-[#6B7280] hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Role Description */}
                            <div className="flex items-start gap-2 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5 shrink-0"></div>
                                <p className="text-xs text-[#6B7280]">
                                    {roleDescriptions[selectedRole]}
                                </p>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                            {/* Cancel Button */}
                            <button
                                onClick={handleClose}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#6B7280] text-sm font-normal hover:bg-gray-50 transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2173_2351)">
                                        <path d="M8.94252 7.99962L15.8045 1.13762C15.926 1.01189 15.9932 0.843484 15.9916 0.668686C15.9901 0.493888 15.92 0.32668 15.7964 0.203075C15.6728 0.0794693 15.5056 0.00935665 15.3308 0.0078377C15.156 0.00631876 14.9876 0.073515 14.8619 0.194954L7.99986 7.05695L1.13786 0.194954C1.01212 0.073515 0.843721 0.00631876 0.668923 0.0078377C0.494126 0.00935665 0.326917 0.0794693 0.203312 0.203075C0.0797065 0.32668 0.00959389 0.493888 0.00807494 0.668686C0.006556 0.843484 0.0737523 1.01189 0.195191 1.13762L7.05719 7.99962L0.195191 14.8616C0.0702103 14.9866 0 15.1562 0 15.333C0 15.5097 0.0702103 15.6793 0.195191 15.8043V15.8043C0.320209 15.9293 0.489748 15.9995 0.666524 15.9995C0.8433 15.9995 1.01284 15.9293 1.13786 15.8043L7.99986 8.94229L14.8619 15.8043C14.9869 15.9293 15.1564 15.9995 15.3332 15.9995C15.51 15.9995 15.6795 15.9293 15.8045 15.8043C15.9295 15.6793 15.9997 15.5097 15.9997 15.333C15.9997 15.1562 15.9295 14.9866 15.8045 14.8616L8.94252 7.99962Z" fill="#727A90" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2173_2351">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Cancel
                            </button>

                            {/* Add Role Button */}
                            <button
                                onClick={handleAdd}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25C889] text-white text-sm font-semibold hover:bg-[#20B578] transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2173_675)">
                                        <path d="M15.3333 7.33333H8.66667V0.666667C8.66667 0.489856 8.59643 0.320286 8.4714 0.195262C8.34638 0.0702379 8.17681 0 8 0V0C7.82319 0 7.65362 0.0702379 7.5286 0.195262C7.40357 0.320286 7.33333 0.489856 7.33333 0.666667V7.33333H0.666667C0.489856 7.33333 0.320286 7.40357 0.195262 7.5286C0.0702379 7.65362 0 7.82319 0 8H0C0 8.17681 0.0702379 8.34638 0.195262 8.4714C0.320286 8.59643 0.489856 8.66667 0.666667 8.66667H7.33333V15.3333C7.33333 15.5101 7.40357 15.6797 7.5286 15.8047C7.65362 15.9298 7.82319 16 8 16C8.17681 16 8.34638 15.9298 8.4714 15.8047C8.59643 15.6797 8.66667 15.5101 8.66667 15.3333V8.66667H15.3333C15.5101 8.66667 15.6797 8.59643 15.8047 8.4714C15.9298 8.34638 16 8.17681 16 8C16 7.82319 15.9298 7.65362 15.8047 7.5286C15.6797 7.40357 15.5101 7.33333 15.3333 7.33333Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2173_675">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                Add Role
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

