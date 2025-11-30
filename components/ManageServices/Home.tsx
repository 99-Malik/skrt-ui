"use client";

import React, { useState } from "react";
import AddServiceModal from "./AddServiceModal";

interface Service {
    id: string;
    name: string;
    totalFee: string;
    serviceFee: string;
    taxes: string;
    image?: string;
}

export default function Home() {
    const [activeTab, setActiveTab] = useState<"tier1" | "tier2" | "tier3">("tier1");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<{
        tier1: Service[];
        tier2: Service[];
        tier3: Service[];
    }>({
        tier1: [],
        tier2: [],
        tier3: [],
    });

    const handleAddService = (service: Omit<Service, "id">) => {
        const newService: Service = {
            ...service,
            id: Date.now().toString(),
        };
        setServices((prev) => ({
            ...prev,
            [activeTab]: [...prev[activeTab], newService],
        }));
    };

    const handleDeleteService = (serviceId: string) => {
        setServices((prev) => ({
            ...prev,
            [activeTab]: prev[activeTab].filter((s) => s.id !== serviceId),
        }));
    };

    const handleUpdateService = (serviceId: string, field: keyof Service, value: string) => {
        setServices((prev) => ({
            ...prev,
            [activeTab]: prev[activeTab].map((s) =>
                s.id === serviceId ? { ...s, [field]: value } : s
            ),
        }));
    };

    const getServiceIcon = (serviceName: string) => {
        const name = serviceName.toLowerCase();
        if (name.includes("tow") || name.includes("mileage")) {
            // Car tire with wrench icon
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" stroke="#727A90" strokeWidth="2" fill="none" />
                    <path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke="#727A90" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="#727A90" strokeWidth="1.5" fill="none" />
                </svg>
            );
        } else if (name.includes("electric") || name.includes("ev") || name.includes("charge")) {
            // Electric vehicle charging plug icon
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2V8H11V10H5V2H7Z" fill="#727A90" />
                    <path d="M17 2V8H13V10H19V2H17Z" fill="#727A90" />
                    <path d="M3 12H21V14H3V12Z" fill="#727A90" />
                    <path d="M5 16H19V22H5V16Z" fill="#727A90" />
                </svg>
            );
        } else {
            // Default service icon
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#727A90" strokeWidth="2" fill="none" />
                    <path d="M12 6V12L16 14" stroke="#727A90" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }
    };

    const currentServices = services[activeTab];

    return (
        <div className="space-y-6 font-sans w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#1F2937]">Manage Services</h1>
                <button className="px-6 py-3 rounded-xl bg-[#25C889] text-white text-sm font-semibold hover:bg-[#20B578] transition-colors">
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("tier1")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "tier1"
                                ? "text-[#1F2937] border-[#25C889]"
                                : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Tier 1
                    </button>
                    <button
                        onClick={() => setActiveTab("tier2")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "tier2"
                                ? "text-[#1F2937] border-[#25C889]"
                                : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Tier 2
                    </button>
                    <button
                        onClick={() => setActiveTab("tier3")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "tier3"
                                ? "text-[#1F2937] border-[#25C889]"
                                : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Tier 3
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {/* Tier Services Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#1F2937]">
                        {activeTab === "tier1" && "Tier 1 Services"}
                        {activeTab === "tier2" && "Tier 2 Services"}
                        {activeTab === "tier3" && "Tier 3 Services"}
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8F9F1] text-[#25C889] border border-[#25C889] text-sm font-semibold hover:bg-[#D1F2E5] transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3.33333V12.6667M3.33333 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add Service
                    </button>
                </div>

                {/* Services List */}
                {currentServices.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8">
                        <p className="text-lg text-[#6B7280] text-center">
                            No services added yet. Click "Add Service" to get started.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6"
                            >
                                {/* Service Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                            {service.image ? (
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                getServiceIcon(service.name)
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-[#1F2937]">{service.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteService(service.id)}
                                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5C2 5.26522 2.10536 5.51957 2.29289 5.70711C2.48043 5.89464 2.73478 6 3 6H4V19C4.00159 20.3256 4.52888 21.5964 5.46622 22.5338C6.40356 23.4711 7.67441 23.9984 9 24H15C16.3256 23.9984 17.5964 23.4711 18.5338 22.5338C19.4711 21.5964 19.9984 20.3256 20 19V6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM11 2H13C13.6203 2.00076 14.2251 2.19338 14.7316 2.55144C15.2381 2.90951 15.6214 3.41549 15.829 4H8.171C8.37858 3.41549 8.7619 2.90951 9.26839 2.55144C9.77487 2.19338 10.3797 2.00076 11 2ZM18 19C18 19.7956 17.6839 20.5587 17.1213 21.1213C16.5587 21.6839 15.7956 22 15 22H9C8.20435 22 7.44129 21.6839 6.87868 21.1213C6.31607 20.5587 6 19.7956 6 19V6H18V19Z" fill="#FF383C" />
                                            <path d="M10 17.9995C10.2652 17.9995 10.5196 17.8941 10.7071 17.7066C10.8946 17.5191 11 17.2647 11 16.9995V10.9995C11 10.7343 10.8946 10.4799 10.7071 10.2924C10.5196 10.1049 10.2652 9.99951 10 9.99951C9.73478 9.99951 9.48043 10.1049 9.29289 10.2924C9.10536 10.4799 9 10.7343 9 10.9995V16.9995C9 17.2647 9.10536 17.5191 9.29289 17.7066C9.48043 17.8941 9.73478 17.9995 10 17.9995Z" fill="#FF383C" />
                                            <path d="M14 17.9995C14.2652 17.9995 14.5196 17.8941 14.7071 17.7066C14.8947 17.5191 15 17.2647 15 16.9995V10.9995C15 10.7343 14.8947 10.4799 14.7071 10.2924C14.5196 10.1049 14.2652 9.99951 14 9.99951C13.7348 9.99951 13.4804 10.1049 13.2929 10.2924C13.1054 10.4799 13 10.7343 13 10.9995V16.9995C13 17.2647 13.1054 17.5191 13.2929 17.7066C13.4804 17.8941 13.7348 17.9995 14 17.9995Z" fill="#FF383C" />
                                        </svg>

                                    </button>
                                </div>

                                {/* Fee Input Fields */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                            Total Fee
                                        </label>
                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                            <div className="flex items-center justify-center px-4 py-2.5 bg-gray-100">
                                                <span className="text-[#727A90] text-sm font-medium">$</span>
                                            </div>
                                            <div className="w-px self-stretch bg-gray-200"></div>
                                            <input
                                                type="text"
                                                value={service.totalFee}
                                                onChange={(e) => handleUpdateService(service.id, "totalFee", e.target.value)}
                                                className="flex-1 px-4 py-2.5 text-sm text-[#727A90] bg-white focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                            Service Fee
                                        </label>
                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                            <div className="flex items-center justify-center px-4 py-2.5 bg-gray-100">
                                                <span className="text-[#727A90] text-sm font-medium">$</span>
                                            </div>
                                            <div className="w-px self-stretch bg-gray-200"></div>
                                            <input
                                                type="text"
                                                value={service.serviceFee}
                                                onChange={(e) => handleUpdateService(service.id, "serviceFee", e.target.value)}
                                                className="flex-1 px-4 py-2.5 text-sm text-[#727A90] bg-white focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                            Taxes
                                        </label>
                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                            <div className="flex items-center justify-center px-4 py-2.5 bg-gray-100">
                                                <span className="text-[#727A90] text-sm font-medium">$</span>
                                            </div>
                                            <div className="w-px self-stretch bg-gray-200"></div>
                                            <input
                                                type="text"
                                                value={service.taxes}
                                                onChange={(e) => handleUpdateService(service.id, "taxes", e.target.value)}
                                                className="flex-1 px-4 py-2.5 text-sm text-[#727A90] bg-white focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Service Modal */}
            <AddServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddService}
                tier={activeTab}
            />
        </div>
    );
}

