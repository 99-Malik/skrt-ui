"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import AddRolesModal from "./Modal/AddRoles";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    restricted: boolean;
}

const roles = ["Editor", "Viewer", "Contributor", "Manager"];

export default function Home() {
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            name: "Lara Whitaker",
            email: "larawhit2023@example.com",
            role: "Editor",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
            restricted: false,
        },
        {
            id: "2",
            name: "Marcus Lyle",
            email: "marcuslyle89@yahoo.com",
            role: "Viewer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            restricted: false,
        },
        {
            id: "3",
            name: "Nina Patel",
            email: "ninapatel.smith@gmail.com",
            role: "Contributor",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            restricted: false,
        },
        {
            id: "4",
            name: "Oliver Chen",
            email: "oliverchen2023@hotmail.com",
            role: "Manager",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            restricted: false,
        },
    ]);

    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.keys(dropdownRefs.current).forEach((userId) => {
                const ref = dropdownRefs.current[userId];
                if (ref && !ref.contains(event.target as Node)) {
                    setOpenDropdowns((prev) => ({ ...prev, [userId]: false }));
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleRoleChange = (userId: string, newRole: string) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
        );
        setOpenDropdowns((prev) => ({ ...prev, [userId]: false }));
    };

    const toggleDropdown = (userId: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const toggleRestrictAccess = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === userId ? { ...user, restricted: !user.restricted } : user))
        );
    };

    const handleAddRole = (email: string, role: string) => {
        // Add new user with the provided email and role
        const newUser: User = {
            id: Date.now().toString(),
            name: email.split("@")[0], // Use email prefix as name
            email: email,
            role: role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=25C889&color=fff&size=128`,
            restricted: false,
        };
        setUsers((prev) => [...prev, newUser]);
    };

    return (
        <div className="space-y-6 font-sans w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#1F2937]">Manage Roles</h1>
                <button
                    onClick={() => setIsAddRoleModalOpen(true)}
                    className="px-6 py-3 rounded-xl flex items-center gap-2 flex-row bg-[#25C889] text-white text-sm font-semibold hover:bg-[#20B578] transition-colors"
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

            {/* User Cards */}
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-3 items-center gap-6"
                    >
                        {/* User Info (Left) */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25C889&color=fff&size=128`;
                                    }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#1F2937]">{user.name}</span>
                                <span className="text-sm text-[#6B7280]">{user.email}</span>
                            </div>
                        </div>

                        {/* Role Dropdown (Middle) */}
                        <div className="flex items-center gap-3 justify-center">
                            <span className="text-sm text-[#1F2937]">Role</span>
                            <div className="relative" ref={(el) => { dropdownRefs.current[user.id] = el; }}>
                                <button
                                    onClick={() => toggleDropdown(user.id)}
                                    className="flex items-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-[#1F2937] cursor-pointer hover:bg-gray-50 min-w-[200px] overflow-hidden h-10"
                                >
                                    <span className="truncate px-4 py-2 flex-1 h-full flex items-center">{user.role}</span>
                                    <div className="h-full border-l border-gray-200 bg-gray-50 px-2 flex items-center shrink-0">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-transform shrink-0 ${openDropdowns[user.id] ? "rotate-180" : ""
                                                }`}
                                        >
                                            <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                        </svg>
                                    </div>
                                </button>

                                {openDropdowns[user.id] && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                                        <div className="py-1">
                                            {roles.map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => handleRoleChange(user.id, role)}
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${user.role === role
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
                        </div>

                        {/* Restrict Access (Right) */}
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm text-[#1F2937]">Restrict Access</span>
                            <button
                                onClick={() => toggleRestrictAccess(user.id)}
                                className={`relative w-11 h-6 rounded-full transition-colors ${user.restricted ? "bg-[#25C889]" : "bg-gray-200"
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform ${user.restricted ? "translate-x-5" : "translate-x-0"
                                        }`}
                                >
                                    <X size={12} className="text-[#6B7280]" />
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Role Modal */}
            <AddRolesModal
                isOpen={isAddRoleModalOpen}
                onClose={() => setIsAddRoleModalOpen(false)}
                onAdd={handleAddRole}
            />
        </div>
    );
}
