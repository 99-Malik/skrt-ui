"use client";

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface Dispute {
    id: string;
    name: string;
    status: string;
    statusColor: string; // 'red', 'green', 'gray' etc. for the badge or text
    avatar: string; // URL or initials
    initials?: string;
    unreadCount?: number;
    isActive?: boolean;
    bgColor?: string; // For the avatar background if no image
}

const disputes: Dispute[] = [
    {
        id: '1',
        name: 'Michael Philips',
        status: 'Payment on hold',
        statusColor: 'text-gray-500',
        avatar: '',
        initials: 'MP',
        unreadCount: 10,
        bgColor: 'bg-red-100 text-red-600'
    },
    {
        id: '2',
        name: 'Alina Rao',
        status: 'Refund request',
        statusColor: 'text-gray-500',
        avatar: '',
        initials: 'AR',
        bgColor: 'bg-cyan-100 text-cyan-600'
    },
    {
        id: '3',
        name: 'Ricardo Estevez',
        status: 'Invoice issue',
        statusColor: 'text-gray-800',
        avatar: 'https://ui-avatars.com/api/?name=Ricardo+Estevez&background=random', // Placeholder
        unreadCount: 2,
        isActive: true,
        bgColor: ''
    },
    {
        id: '4',
        name: 'Laura Kinney',
        status: 'Payment declined',
        statusColor: 'text-gray-500',
        avatar: 'https://ui-avatars.com/api/?name=Laura+Kinney&background=random', // Placeholder
        bgColor: ''
    }
];

export default function DisputeList() {
    return (
        <div className="w-full h-full flex flex-col bg-white border-r border-gray-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 shrink-0 h-[73px] flex items-center">
                <h2 className="text-xl font-bold text-[#1F2937]">Disputes</h2>
            </div>

            {/* Search Bar */}
            <div className="p-4">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search disputes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889]"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {disputes.map((dispute) => (
                    <div
                        key={dispute.id}
                        className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 ${dispute.isActive ? 'bg-[#E8FAF3] border-r-2 border-[#25C889]' : ''
                            }`}
                    >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            {dispute.avatar && !dispute.initials ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        src={dispute.avatar}
                                        alt={dispute.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${dispute.bgColor}`}>
                                    {dispute.initials}
                                </div>
                            )}
                            {/* Online Status Dot (Optional, shown in design for some) */}
                            {dispute.isActive && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className={`text-sm font-semibold truncate ${dispute.isActive ? 'text-[#1F2937]' : 'text-[#374151]'}`}>
                                    {dispute.name}
                                </h3>
                                {dispute.unreadCount && (
                                    <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {dispute.unreadCount > 9 ? '9+' : dispute.unreadCount}
                                    </span>
                                )}
                            </div>
                            <p className={`text-xs truncate ${dispute.isActive ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>
                                {dispute.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
