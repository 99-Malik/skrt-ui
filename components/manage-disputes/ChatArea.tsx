"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
    avatar?: string;
}

const initialMessages: Message[] = [
    {
        id: '1',
        text: "Hello, Jack. I see my payment is still on hold. Can you please provide additional information?",
        sender: 'other',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Ricardo+Estevez&background=random'
    },
    {
        id: '2',
        text: "We are still waiting for the confirmation from your bank. Can you please contact them?",
        sender: 'me',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Jack+Tompshon&background=random'
    },
    {
        id: '3',
        text: "I have reviewed your documents, and everything seems to be in order. I'll escalate this issue.",
        sender: 'other',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Ricardo+Estevez&background=random'
    },
    {
        id: '4',
        text: "I've contacted the payment gateway, and they informed me that there was a temporary issue. Please try again.",
        sender: 'me',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Jack+Tompshon&background=random'
    },
    {
        id: '5',
        text: "We have processed your refund. It should reflect in your account within 3-5 business days.",
        sender: 'other',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Ricardo+Estevez&background=random'
    },
    {
        id: '6',
        text: "Your payment has been successfully processed.",
        sender: 'me',
        timestamp: '1 day ago',
        avatar: 'https://ui-avatars.com/api/?name=Jack+Tompshon&background=random'
    }
];

export default function ChatArea() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Only scroll to bottom after component mounts and messages are rendered
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'me',
            timestamp: 'Just now',
            avatar: 'https://ui-avatars.com/api/?name=Jack+Tompshon&background=random'
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full relative" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Background Image with Gray Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url('/images/whatsapp-bg.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>
            {/* Silver Gray Overlay for complete look */}
            <div className="absolute inset-0 bg-gray-100/90 pointer-events-none"></div>

            {/* Header - Fixed at top */}
            <div className="bg-white border-b border-gray-200 px-6 h-[73px] flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                                src="https://ui-avatars.com/api/?name=Jack+Tompshon&background=random"
                                alt="Jack Tompshon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-[#1F2937]">Jack Tompshon</h2>
                        <p className="text-xs text-[#6B7280]">Online</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Messages - Scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10" style={{ minHeight: 0, overflowY: 'auto' }}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[80%] ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                            {/* Avatar */}
                            <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden mt-1">
                                <img
                                    src={msg.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Message Bubble */}
                            <div className="flex flex-col gap-1">
                                <div
                                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'me'
                                        ? 'bg-[#25C889] text-white rounded-tr-none'
                                        : 'bg-white text-[#374151] rounded-tl-none border border-gray-100'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <span className={`text-[10px] text-black ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="px-6 py-3 bg-white border-t border-gray-200 z-10 shrink-0">
                <div className="flex items-center gap-3">
                    {/* Input & Attachment Container */}
                    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#25C889] transition-colors">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 text-sm bg-transparent focus:outline-none text-[#374151] placeholder-gray-400"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {/* Attachment Button - Inside container */}
                        <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1672_14346)">
                                    <path d="M17.3 8.39947C17.175 8.27449 17.0055 8.20428 16.8287 8.20428C16.6519 8.20428 16.4824 8.27449 16.3573 8.39947L9.09602 15.6921C8.78649 16.0017 8.41902 16.2473 8.01459 16.4148C7.61016 16.5824 7.17668 16.6686 6.73892 16.6687C5.85481 16.6687 5.00689 16.3176 4.38168 15.6925C3.75648 15.0674 3.40521 14.2195 3.40515 13.3354C3.40508 12.4513 3.75623 11.6033 4.38135 10.9781L11.414 3.91681C11.7901 3.54673 12.2971 3.34025 12.8247 3.34234C13.3523 3.34442 13.8578 3.55491 14.2309 3.92794C14.604 4.30098 14.8146 4.80634 14.8168 5.33394C14.819 5.86155 14.6127 6.36866 14.2427 6.74481L7.21002 13.8061C7.08318 13.9276 6.91432 13.9955 6.73868 13.9955C6.56304 13.9955 6.39418 13.9276 6.26735 13.8061C6.14237 13.6811 6.07216 13.5116 6.07216 13.3348C6.07216 13.158 6.14237 12.9885 6.26735 12.8635L12.5287 6.57347C12.6501 6.44774 12.7173 6.27934 12.7158 6.10454C12.7143 5.92974 12.6442 5.76253 12.5206 5.63893C12.397 5.51532 12.2297 5.44521 12.0549 5.44369C11.8802 5.44217 11.7118 5.50937 11.586 5.63081L5.32468 11.9208C5.13893 12.1065 4.99158 12.327 4.89105 12.5697C4.79052 12.8124 4.73878 13.0725 4.73878 13.3351C4.73878 13.5978 4.79052 13.8579 4.89105 14.1006C4.99158 14.3433 5.13893 14.5638 5.32468 14.7495C5.70576 15.1131 6.21227 15.316 6.73902 15.316C7.26576 15.316 7.77227 15.1131 8.15335 14.7495L15.1853 7.68747C15.7973 7.05967 16.1374 6.21604 16.1317 5.33932C16.1261 4.4626 15.7753 3.62339 15.1553 3.00349C14.5353 2.38358 13.6961 2.0329 12.8194 2.02741C11.9426 2.02192 11.0991 2.36205 10.4713 2.97414L3.43868 10.0355C2.56347 10.9107 2.07178 12.0977 2.07178 13.3355C2.07178 14.5732 2.56347 15.7603 3.43868 16.6355C4.3139 17.5107 5.50094 18.0024 6.73868 18.0024C7.97642 18.0024 9.16347 17.5107 10.0387 16.6355L17.3 9.34481C17.3623 9.28285 17.4117 9.2092 17.4455 9.12809C17.4792 9.04697 17.4965 8.95999 17.4965 8.87214C17.4965 8.78429 17.4792 8.69731 17.4455 8.61619C17.4117 8.53507 17.3623 8.46142 17.3 8.39947Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1672_14346">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </button>
                    </div>

                    {/* Send Button - Outside container */}
                    <button
                        onClick={handleSend}
                        className="p-3 bg-[#25C889] hover:bg-[#20B578] text-white rounded-xl transition-colors shadow-sm shrink-0 flex items-center justify-center"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3333 1.66666L9.16666 10.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.3333 1.66666L12.5 18.3333L9.16666 10.8333L1.66666 7.5L18.3333 1.66666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
