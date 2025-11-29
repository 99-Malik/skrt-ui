"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}: PaginationProps) {
    // Generate page numbers to show (1, 2, 3, ...)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= 3) {
                // Show 1, 2, 3, 4, ..., last
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show 1, ..., last-3, last-2, last-1, last
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show 1, ..., current-1, current, current+1, ..., last
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                    <path d="M16.86 20.3933L13.14 16.6666C13.0159 16.5417 12.9462 16.3727 12.9462 16.1966C12.9462 16.0205 13.0159 15.8515 13.14 15.7266L16.86 11.9999C16.9533 11.9059 17.0724 11.8418 17.2022 11.8158C17.3321 11.7897 17.4667 11.8029 17.589 11.8537C17.7113 11.9045 17.8157 11.9905 17.8889 12.1009C17.9621 12.2112 18.0008 12.3409 18 12.4733V19.9199C18.0008 20.0524 17.9621 20.182 17.8889 20.2924C17.8157 20.4027 17.7113 20.4887 17.589 20.5395C17.4667 20.5903 17.3321 20.6035 17.2022 20.5775C17.0724 20.5514 16.9533 20.4873 16.86 20.3933Z" fill="#686F83" />
                </svg>

            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => {
                if (page === "...") {
                    return (
                        <button
                            key={`ellipsis-${index}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-[#6B7280] text-sm"
                        >
                            ...
                        </button>
                    );
                }

                const pageNum = page as number;
                const isActive = currentPage === pageNum;

                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all ${isActive
                            ? "bg-[#F3F4F6] text-[#1F2937] font-bold"
                            : "bg-white border border-gray-200 text-[#6B7280] hover:bg-gray-50"
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                    <path d="M14.0001 19.9199V12.4733C13.9994 12.3409 14.038 12.2112 14.1112 12.1009C14.1844 11.9905 14.2889 11.9045 14.4111 11.8537C14.5334 11.8029 14.6681 11.7897 14.7979 11.8158C14.9278 11.8418 15.0469 11.9059 15.1401 11.9999L18.8601 15.7266C18.9843 15.8515 19.054 16.0205 19.054 16.1966C19.054 16.3727 18.9843 16.5417 18.8601 16.6666L15.1401 20.3933C15.0469 20.4873 14.9278 20.5514 14.7979 20.5775C14.6681 20.6035 14.5334 20.5903 14.4111 20.5395C14.2889 20.4887 14.1844 20.4027 14.1112 20.2924C14.038 20.182 13.9994 20.0524 14.0001 19.9199Z" fill="#686F83" />
                </svg>

            </button>
        </div>
    );
}
