"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/ManageUsers/Pagination/Page";
import { Search, Check } from "lucide-react";
import UploadTaxForm from "./Modal/UploadTaxForm";

interface Responder {
    id: string;
    userName: string;
    userAvatar?: string;
    formStatus: "Submitted" | "Not Submitted";
    email: string;
    submissionDate: string;
}

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All Types");
    const [currentPage, setCurrentPage] = useState(1);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [filterOpen, setFilterOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const filterOptions = ["All Types", "Submitted", "Not Submitted"];

    // Sample data
    const responders: Responder[] = [
        {
            id: "1",
            userName: "John Bushmill",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John+Bushmill",
            formStatus: "Submitted",
            email: "admin@example.com",
            submissionDate: "2023-10-01",
        },
        {
            id: "2",
            userName: "Ilham Budi Agung",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ilham+Budi",
            formStatus: "Not Submitted",
            email: "mod@example.com",
            submissionDate: "--",
        },
        {
            id: "3",
            userName: "Mohammad Karim",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad+Karim",
            formStatus: "Not Submitted",
            email: "user1@example.com",
            submissionDate: "--",
        },
        {
            id: "4",
            userName: "Linda Blair",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda+Blair",
            formStatus: "Not Submitted",
            email: "user2@example.com",
            submissionDate: "--",
        },
        {
            id: "5",
            userName: "Josh Adam",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Josh+Adam",
            formStatus: "Not Submitted",
            email: "user3@example.com",
            submissionDate: "--",
        },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const totalItems = 100;
    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const filteredData = responders.filter((item) => {
        const matchesSearch = 
            item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = 
            filterType === "All Types" ||
            item.formStatus === filterType;
        
        return matchesSearch && matchesFilter;
    });

    const handleImageError = (id: string) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-6 font-sans w-full">
            {/* Header with Upload Form Button */}
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-[#1F2937]">Manage Taxation</h1>
                <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25C889] text-white text-sm font-medium hover:bg-[#20B578] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2173_675)">
                            <path d="M15.3333 7.33333H8.66667V0.666667C8.66667 0.489856 8.59643 0.320286 8.4714 0.195262C8.34638 0.0702379 8.17681 0 8 0V0C7.82319 0 7.65362 0.0702379 7.5286 0.195262C7.40357 0.320286 7.33333 0.489856 7.33333 0.666667V7.33333H0.666667C0.489856 7.33333 0.320286 7.40357 0.195262 7.5286C0.0702379 7.65362 0 7.82319 0 8H0C0 8.17681 0.0702379 8.34638 0.195262 8.4714C0.320286 8.59643 0.489856 8.66667 0.666667 8.66667H7.33333V15.3333C7.33333 15.5101 7.40357 15.6797 7.5286 15.8047C7.65362 15.9298 7.82319 16 8 16C8.17681 16 8.34638 15.9298 8.4714 15.8047C8.59643 15.6797 8.66667 15.5101 8.66667 15.3333V8.66667H15.3333C15.5101 8.66667 15.6797 8.59643 15.8047 8.4714C15.9298 8.34638 16 8.17681 16 8C16 7.82319 15.9298 7.65362 15.8047 7.5286C15.6797 7.40357 15.5101 7.33333 15.3333 7.33333Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2173_675">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Upload Form
                </button>
            </div>

            {/* Responder List Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-[#1F2937]">Responder List</h2>
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] w-64"
                            />
                        </div>
                        {/* Filter */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#6B7280] cursor-pointer hover:bg-gray-50 w-[140px]"
                            >
                                <span className="truncate">{filterType}</span>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform shrink-0 ${filterOpen ? 'rotate-180' : ''}`}
                                >
                                    <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                </svg>
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                                    <div className="py-1">
                                        {filterOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setFilterType(option);
                                                    setFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${filterType === option
                                                    ? "text-[#25C889] font-medium"
                                                    : "text-[#6B7280] hover:bg-gray-50"
                                                    }`}
                                            >
                                                <span>{option}</span>
                                                {filterType === option && (
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
                                    Form Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                    Submission Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((responder) => (
                                    <tr key={responder.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                    {responder.userAvatar && !imageErrors[responder.id] ? (
                                                        <Image
                                                            src={responder.userAvatar}
                                                            alt={responder.userName}
                                                            fill
                                                            className="object-cover"
                                                            onError={() => handleImageError(responder.id)}
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <span className="text-xs font-semibold text-[#6B7280]">
                                                            {getInitials(responder.userName)}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-[#1F2937]">
                                                    {responder.userName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${responder.formStatus === "Submitted"
                                                    ? "text-[#10B981]"
                                                    : "text-[#EF4444]"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${responder.formStatus === "Submitted"
                                                        ? "bg-[#10B981]"
                                                        : "bg-[#EF4444]"
                                                        }`}
                                                ></div>
                                                {responder.formStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-[#6B7280]">
                                                {responder.email}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-[#6B7280]">
                                                {responder.submissionDate}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                        Showing {startItem}-{endItem} from {totalItems}
                    </span>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Upload Tax Form Modal */}
            <UploadTaxForm
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </div>
    );
}
