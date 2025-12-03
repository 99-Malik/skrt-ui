"use client";

import React from 'react';
import DisputeList from './DisputeList';
import ChatArea from './ChatArea';

export default function Home() {
    return (
        <div className="flex h-full bg-white rounded-2xl  border border-gray-200 overflow-hidden" style={{ height: '100%', maxHeight: '100%' }}>
            {/* Sidebar - Dispute List */}
            <div className="w-[320px] shrink-0 border-r border-gray-200 h-full overflow-hidden">
              
                <DisputeList />
            </div>

            {/* Main Content - Chat Area */}
            <div className="flex-1 h-full min-w-0 overflow-hidden">
                <ChatArea />
            </div>
        </div>
    );
}
