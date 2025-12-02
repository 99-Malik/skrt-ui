"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/ManageUsers/Pagination/Page";
import { Search, Check } from "lucide-react";

interface Transaction {
    id: string;
    userName: string;
    userAvatar?: string;
    userType: "Requestor" | "Responder";
    paymentDetails: string;
    dated: string;
    amount: string;
    category: string;
}

interface Withdrawal {
    id: string;
    userName: string;
    userAvatar?: string;
    paymentDetails: string;
    dated: string;
    amount: string;
    status: "Completed" | "Failed";
}

interface TableProps {
    type: "transactions" | "withdrawals";
    data: Transaction[] | Withdrawal[];
    totalItems?: number;
    itemsPerPage?: number;
}

export default function Table({ type, data, totalItems = 100, itemsPerPage = 5 }: TableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All Types");
    const [currentPage, setCurrentPage] = useState(1);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const filterOptions = type === "transactions" 
        ? ["All Types", "Subscription", "Assistance"]
        : ["All Types", "Completed", "Failed"];

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

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const filteredData = data.filter((item) => {
        const matchesSearch = 
            (type === "transactions" 
                ? (item as Transaction).userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (item as Transaction).category.toLowerCase().includes(searchQuery.toLowerCase())
                : (item as Withdrawal).userName.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesFilter = 
            filterType === "All Types" ||
            (type === "transactions"
                ? (item as Transaction).category === filterType
                : (item as Withdrawal).status === filterType);
        
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
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#1F2937]">
                    {type === "transactions" ? "Recent Transactions" : "Responder Withdrawals"}
                </h2>
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
                                {type === "transactions" ? (
                                    <>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Users
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            User Type
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Payment Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Dated
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Category
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Users
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Payment Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Dated
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                            Status
                                        </th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={type === "transactions" ? 6 : 5}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => {
                                    if (type === "transactions") {
                                        const transaction = item as Transaction;
                                        return (
                                            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                            {transaction.userAvatar && !imageErrors[transaction.id] ? (
                                                                <Image
                                                                    src={transaction.userAvatar}
                                                                    alt={transaction.userName}
                                                                    fill
                                                                    className="object-cover"
                                                                    onError={() => handleImageError(transaction.id)}
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-semibold text-[#6B7280]">
                                                                    {getInitials(transaction.userName)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-semibold text-[#1F2937]">
                                                            {transaction.userName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${transaction.userType === "Requestor"
                                                            ? "text-[#25C889]"
                                                            : "text-[#00A3FF]"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-1.5 h-1.5 rounded-full ${transaction.userType === "Requestor"
                                                                ? "bg-[#25C889]"
                                                                : "bg-[#00A3FF]"
                                                                }`}
                                                        ></div>
                                                        {transaction.userType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="32" height="20" rx="3" fill="#1434CB"/>
                                                            <text x="16" y="13" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">VISA</text>
                                                        </svg>
                                                        <span className="text-sm text-[#6B7280]">
                                                            {transaction.paymentDetails}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-[#1F2937]">
                                                            {transaction.dated.split(' ').slice(0, 3).join(' ')}
                                                        </span>
                                                        <span className="text-xs text-[#6B7280]">
                                                            {transaction.dated.split(' ').slice(3).join(' ')}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-semibold text-[#1F2937]">
                                                        {transaction.amount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-sm font-medium ${
                                                            transaction.category === "Subscription"
                                                                ? "text-[#25C889]"
                                                                : "text-[#00A3FF]"
                                                        }`}
                                                    >
                                                        {transaction.category}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        const withdrawal = item as Withdrawal;
                                        return (
                                            <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                            {withdrawal.userAvatar && !imageErrors[withdrawal.id] ? (
                                                                <Image
                                                                    src={withdrawal.userAvatar}
                                                                    alt={withdrawal.userName}
                                                                    fill
                                                                    className="object-cover"
                                                                    onError={() => handleImageError(withdrawal.id)}
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-semibold text-[#6B7280]">
                                                                    {getInitials(withdrawal.userName)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-semibold text-[#1F2937]">
                                                            {withdrawal.userName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="32" height="20" rx="3" fill="#1434CB"/>
                                                            <text x="16" y="13" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">VISA</text>
                                                        </svg>
                                                        <span className="text-sm text-[#6B7280]">
                                                            {withdrawal.paymentDetails}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-[#1F2937]">
                                                            {withdrawal.dated.split(' ').slice(0, 3).join(' ')}
                                                        </span>
                                                        <span className="text-xs text-[#6B7280]">
                                                            {withdrawal.dated.split(' ').slice(3).join(' ')}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-semibold text-[#1F2937]">
                                                        {withdrawal.amount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-sm font-medium ${
                                                            withdrawal.status === "Completed"
                                                                ? "text-[#10B981]"
                                                                : "text-[#EF4444]"
                                                        }`}
                                                    >
                                                        {withdrawal.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })
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
    );
}

