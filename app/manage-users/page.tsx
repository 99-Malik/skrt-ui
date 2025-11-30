"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Card from "@/components/ManageUsers/Card/Page";
import Pagination from "@/components/ManageUsers/Pagination/Page";
import {
    UserPlus,
    Users,
    Lock,
    Search,
    ChevronDown,
    Check,
    X,
    Eye,
    Calendar,
} from "lucide-react";
import { UserAddIcon, TotalUsersIcon, BlockedUsersIcon } from "@/components/Svgs/CardSvgs";
import ViewRequestorDetails from "@/components/ManageUsers/Modal/ViewRequestorDetails";
import ViewResponderDetailsModal from "@/components/ManageUsers/Modal/ViewResponderDetailsModal";
import ViewProfile from "@/components/ManageUsers/Modal/ViewProfile";

export default function ManageUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allUsersPage, setAllUsersPage] = useState(1);
    const [newUsersFilterOpen, setNewUsersFilterOpen] = useState(false);
    const [allUsersFilterOpen, setAllUsersFilterOpen] = useState(false);
    const [selectedNewUsersFilter, setSelectedNewUsersFilter] = useState("All Types");
    const [selectedAllUsersFilter, setSelectedAllUsersFilter] = useState("All Types");
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const [isRequestorModalOpen, setIsRequestorModalOpen] = useState(false);
    const [isResponderModalOpen, setIsResponderModalOpen] = useState(false);
    const [showProfileView, setShowProfileView] = useState(false);
    const [selectedUser, setSelectedUser] = useState<typeof newUsers[0] | null>(null);
    const newUsersFilterRef = useRef<HTMLDivElement>(null);
    const allUsersFilterRef = useRef<HTMLDivElement>(null);

    const filterOptions = ["All Types", "Requestor", "Responder"];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (newUsersFilterRef.current && !newUsersFilterRef.current.contains(event.target as Node)) {
                setNewUsersFilterOpen(false);
            }
            if (allUsersFilterRef.current && !allUsersFilterRef.current.contains(event.target as Node)) {
                setAllUsersFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Scroll to top when profile view is shown
    useEffect(() => {
        if (showProfileView) {
            // Find the main scrollable container
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Fallback to window scroll
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [showProfileView]);

    // Mock Data
    const stats = [
        { title: "New Users", count: "750", icon: UserAddIcon, variant: "green" as const },
        { title: "Total Users", count: "31,300", icon: TotalUsersIcon, variant: "blue" as const },
        { title: "Blocked Users", count: "26", icon: BlockedUsersIcon, variant: "red" as const },
    ];

    const newUsers = [
        {
            id: 1,
            name: "John Bushmill",
            type: "Requestor",
            email: "admin@example.com",
            date: "2023-10-01",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John+Bushmill",
        },
        {
            id: 2,
            name: "Ilham Budi Agung",
            type: "Responder",
            email: "mod@example.com",
            date: "2023-10-02",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ilham+Budi",
        },
        {
            id: 3,
            name: "Mohammad Karim",
            type: "Responder",
            email: "sub@example.com",
            date: "2023-10-03",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad+Karim",
        },
        {
            id: 4,
            name: "Linda Blair",
            type: "Requestor",
            email: "guest@example.com",
            date: "2023-10-04",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda+Blair",
        },
        {
            id: 5,
            name: "Josh Adam",
            type: "Responder",
            email: "contrib@example.com",
            date: "2023-10-05",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Josh+Adam",
        },
    ];

    return (
        <DashboardLayout title="Manage Users">
            {showProfileView && selectedUser ? (
                <ViewProfile
                    user={selectedUser}
                    onBack={() => {
                        setShowProfileView(false);
                        setSelectedUser(null);
                    }}
                />
            ) : (
            <div className="space-y-8 font-sans w-full">
                {/* Header Row */}
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-bold text-[#1F2937]">Manage Users</h1>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-xs font-normal text-[#6B7280] cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2082_170)">
                                <path d="M2 14.6667C2.00106 15.5505 2.35259 16.3977 2.97748 17.0226C3.60237 17.6475 4.4496 17.999 5.33333 18.0001H14.6667C15.5504 17.999 16.3976 17.6475 17.0225 17.0226C17.6474 16.3977 17.9989 15.5505 18 14.6667V8.66675H2V14.6667ZM13.3333 11.6667C13.5311 11.6667 13.7245 11.7254 13.8889 11.8353C14.0534 11.9452 14.1815 12.1013 14.2572 12.2841C14.3329 12.4668 14.3527 12.6679 14.3141 12.8618C14.2755 13.0558 14.1803 13.234 14.0404 13.3739C13.9006 13.5137 13.7224 13.6089 13.5284 13.6475C13.3344 13.6861 13.1334 13.6663 12.9507 13.5906C12.7679 13.5149 12.6117 13.3868 12.5019 13.2223C12.392 13.0579 12.3333 12.8645 12.3333 12.6667C12.3333 12.4015 12.4387 12.1472 12.6262 11.9596C12.8138 11.7721 13.0681 11.6667 13.3333 11.6667ZM10 11.6667C10.1978 11.6667 10.3911 11.7254 10.5556 11.8353C10.72 11.9452 10.8482 12.1013 10.9239 12.2841C10.9996 12.4668 11.0194 12.6679 10.9808 12.8618C10.9422 13.0558 10.847 13.234 10.7071 13.3739C10.5673 13.5137 10.3891 13.6089 10.1951 13.6475C10.0011 13.6861 9.80004 13.6663 9.61732 13.5906C9.43459 13.5149 9.27841 13.3868 9.16853 13.2223C9.05865 13.0579 9 12.8645 9 12.6667C9 12.4015 9.10536 12.1472 9.29289 11.9596C9.48043 11.7721 9.73478 11.6667 10 11.6667ZM6.66667 11.6667C6.86445 11.6667 7.05779 11.7254 7.22224 11.8353C7.38669 11.9452 7.51486 12.1013 7.59055 12.2841C7.66623 12.4668 7.68604 12.6679 7.64745 12.8618C7.60887 13.0558 7.51363 13.234 7.37377 13.3739C7.23392 13.5137 7.05574 13.6089 6.86176 13.6475C6.66778 13.6861 6.46671 13.6663 6.28398 13.5906C6.10126 13.5149 5.94508 13.3868 5.8352 13.2223C5.72532 13.0579 5.66667 12.8645 5.66667 12.6667C5.66667 12.4015 5.77202 12.1472 5.95956 11.9596C6.1471 11.7721 6.40145 11.6667 6.66667 11.6667Z" fill="#727A90" />
                                <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2082_170">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Last 10 Days</span>
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {stats.map((stat) => (
                        <Card key={stat.title} {...stat} />
                    ))}
                </div>

                {/* New User Requests Section */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold  text-[#1F2937]">New User Requests</h2>
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] w-64"
                                />
                            </div>
                            {/* Filter */}
                            <div className="relative" ref={newUsersFilterRef}>
                                <button
                                    onClick={() => setNewUsersFilterOpen(!newUsersFilterOpen)}
                                    className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#6B7280] cursor-pointer hover:bg-gray-50 w-[140px]"
                                >
                                    <span className="truncate">{selectedNewUsersFilter}</span>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`transition-transform shrink-0 ${newUsersFilterOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </button>

                                {newUsersFilterOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                                        <div className="py-1">
                                            {filterOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setSelectedNewUsersFilter(option);
                                                        setNewUsersFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${selectedNewUsersFilter === option
                                                        ? "text-[#25C889] font-medium"
                                                        : "text-[#6B7280] hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <span>{option}</span>
                                                    {selectedNewUsersFilter === option && (
                                                        <Check size={16} className="text-[#25C889]" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-[#E9EAEA]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Users
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        User Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Requested at
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            Actions
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.74984 0H9.12884C9.27715 3.16682e-05 9.42213 0.0440353 9.54543 0.126448C9.66874 0.208861 9.76485 0.325984 9.8216 0.463009C9.87835 0.600033 9.8932 0.750807 9.86428 0.896272C9.83535 1.04174 9.76395 1.17536 9.65909 1.28025L5.46959 5.46974C5.32894 5.61034 5.13821 5.68933 4.93934 5.68933C4.74047 5.68933 4.54974 5.61034 4.40909 5.46974L0.21959 1.28025C0.114733 1.17536 0.0433282 1.04174 0.0144026 0.896272C-0.0145231 0.750807 0.000329342 0.600033 0.0570819 0.463009C0.113834 0.325984 0.209939 0.208861 0.333246 0.126448C0.456554 0.0440353 0.601528 3.16682e-05 0.74984 0Z" fill="#8E95A6" />
                                            </svg>



                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {newUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                    {imageErrors.has(user.id) ? (
                                                        <span className="text-xs font-bold text-[#6B7280]">
                                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                        </span>
                                                    ) : (
                                                        <Image
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            fill
                                                            className="object-cover"
                                                            onError={() => {
                                                                setImageErrors(prev => new Set(prev).add(user.id));
                                                            }}
                                                            unoptimized
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-[#1F2937]">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${user.type === "Requestor"
                                                    ? "text-[#25C889]"
                                                    : "text-[#00A3FF]"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${user.type === "Requestor"
                                                        ? "bg-[#25C889]"
                                                        : "bg-[#00A3FF]"
                                                        }`}
                                                ></div>
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#1F2937]">
                                            {user.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#25C889] bg-[#E8F9F1] text-[#25C889] text-xs font-medium transition-colors">
                                                    Approve
                                                    <Check size={14} />
                                                </button>
                                                <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#FF4D4F] bg-[#FFF1F0] text-[#FF4D4F] text-xs font-medium transition-colors">
                                                    Reject
                                                    <X size={14} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        if (user.type === "Requestor") {
                                                            setIsRequestorModalOpen(true);
                                                        } else {
                                                            setIsResponderModalOpen(true);
                                                        }
                                                    }}
                                                    className="w-9 h-8 p-0 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center transition-colors hover:bg-gray-50"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-[#6B7280]">
                            Showing 1-5 from 100
                        </span>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={10}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>

                {/* All Users Section (Simplified for now as it's similar) */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-[#1F2937]">All Users</h2>
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] w-64"
                                />
                            </div>
                            {/* Filter */}
                            <div className="relative" ref={allUsersFilterRef}>
                                <button
                                    onClick={() => setAllUsersFilterOpen(!allUsersFilterOpen)}
                                    className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#6B7280] cursor-pointer hover:bg-gray-50 w-[140px]"
                                >
                                    <span className="truncate">{selectedAllUsersFilter}</span>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`transition-transform shrink-0 ${allUsersFilterOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </button>

                                {allUsersFilterOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                                        <div className="py-1">
                                            {filterOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setSelectedAllUsersFilter(option);
                                                        setAllUsersFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${selectedAllUsersFilter === option
                                                        ? "text-[#25C889] font-medium"
                                                        : "text-[#6B7280] hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <span>{option}</span>
                                                    {selectedAllUsersFilter === option && (
                                                        <Check size={16} className="text-[#25C889]" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-[#E9EAEA]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Users
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        User Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Joined At
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            Actions
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.74984 0H9.12884C9.27715 3.16682e-05 9.42213 0.0440353 9.54543 0.126448C9.66874 0.208861 9.76485 0.325984 9.8216 0.463009C9.87835 0.600033 9.8932 0.750807 9.86428 0.896272C9.83535 1.04174 9.76395 1.17536 9.65909 1.28025L5.46959 5.46974C5.32894 5.61034 5.13821 5.68933 4.93934 5.68933C4.74047 5.68933 4.54974 5.61034 4.40909 5.46974L0.21959 1.28025C0.114733 1.17536 0.0433282 1.04174 0.0144026 0.896272C-0.0145231 0.750807 0.000329342 0.600033 0.0570819 0.463009C0.113834 0.325984 0.209939 0.208861 0.333246 0.126448C0.456554 0.0440353 0.601528 3.16682e-05 0.74984 0Z" fill="#8E95A6" />
                                            </svg>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {newUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                    {imageErrors.has(user.id) ? (
                                                        <span className="text-xs font-bold text-[#6B7280]">
                                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                        </span>
                                                    ) : (
                                                        <Image
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            fill
                                                            className="object-cover"
                                                            onError={() => {
                                                                setImageErrors(prev => new Set(prev).add(user.id));
                                                            }}
                                                            unoptimized
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-[#1F2937]">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${user.type === "Requestor"
                                                    ? "text-[#25C889]"
                                                    : "text-[#00A3FF] "
                                                    }`}
                                            >
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${user.type === "Requestor"
                                                        ? "bg-[#25C889]"
                                                        : "bg-[#00A3FF]"
                                                        }`}
                                                ></div>
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#1F2937]">
                                            {user.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowProfileView(true);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                                            >
                                                <Eye size={14} />
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-[#6B7280]">
                            Showing 1-5 from 100
                        </span>
                        <Pagination
                            currentPage={allUsersPage}
                            totalPages={10}
                            onPageChange={setAllUsersPage}
                        />
                    </div>
                </div>
            </div>
            )}

            {/* View Requestor Details Modal */}
            <ViewRequestorDetails
                isOpen={isRequestorModalOpen}
                onClose={() => {
                    setIsRequestorModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />

            {/* View Responder Details Modal */}
            <ViewResponderDetailsModal
                isOpen={isResponderModalOpen}
                onClose={() => {
                    setIsResponderModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />
        </DashboardLayout>
    );
}
