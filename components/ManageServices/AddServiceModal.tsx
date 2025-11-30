"use client";

import React, { useState, useRef } from "react";

interface AddServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (service: {
        name: string;
        totalFee: string;
        serviceFee: string;
        taxes: string;
        image?: string;
    }) => void;
    tier: "tier1" | "tier2" | "tier3";
}

export default function AddServiceModal({ isOpen, onClose, onAdd, tier }: AddServiceModalProps) {
    const [serviceName, setServiceName] = useState("");
    const [totalFee, setTotalFee] = useState("");
    const [serviceFee, setServiceFee] = useState("");
    const [taxes, setTaxes] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleNumberInput = (value: string): string => {
        // Only allow numbers and decimal point
        return value.replace(/[^0-9.]/g, '');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = () => {
        if (!serviceName.trim()) return;

        onAdd({
            name: serviceName,
            totalFee,
            serviceFee,
            taxes,
            image: imagePreview || undefined,
        });

        // Reset form
        setServiceName("");
        setTotalFee("");
        setServiceFee("");
        setTaxes("");
        setImagePreview(null);
        onClose();
    };

    const handleClose = () => {
        setServiceName("");
        setTotalFee("");
        setServiceFee("");
        setTaxes("");
        setImagePreview(null);
        onClose();
    };

    const tierNumber = tier === "tier1" ? "1" : tier === "tier2" ? "2" : "3";

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900/50 z-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide">
                <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh]  flex flex-col relative my-auto">
                    {/* Header - Fixed */}
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
                        <h2 className="text-xl font-bold text-[#1F2937] mb-1 pr-8">Add Service</h2>
                        <p className="text-sm text-[#6B7280]">
                            Add service in tier {tierNumber} and update its pricing
                        </p>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Service Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                Service Name
                            </label>
                            <input
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder="write here"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                            />
                        </div>

                        {/* Fee Fields */}
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                    Total Fee
                                </label>
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    <div className="flex items-center justify-center px-4 py-3 bg-gray-100">
                                        <span className="text-[#727A90] text-sm font-medium">$</span>
                                    </div>
                                    <div className="w-px self-stretch bg-gray-200"></div>
                                    <input
                                        type="text"
                                        value={totalFee}
                                        onChange={(e) => setTotalFee(handleNumberInput(e.target.value))}
                                        placeholder="enter Total Fee"
                                        className="flex-1 px-4 py-3 text-sm text-[#727A90] bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                    Service Fee
                                </label>
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    <div className="flex items-center justify-center px-4 py-3 bg-gray-100">
                                        <span className="text-[#727A90] text-sm font-medium">$</span>
                                    </div>
                                    <div className="w-px self-stretch bg-gray-200"></div>
                                    <input
                                        type="text"
                                        value={serviceFee}
                                        onChange={(e) => setServiceFee(handleNumberInput(e.target.value))}
                                        placeholder="enter Service Fee"
                                        className="flex-1 px-4 py-3 text-sm text-[#727A90] bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                    Taxes
                                </label>
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    <div className="flex items-center justify-center px-4 py-3 bg-gray-100">
                                        <span className="text-[#727A90] text-sm font-medium">$</span>
                                    </div>
                                    <div className="w-px self-stretch bg-gray-200"></div>
                                    <input
                                        type="text"
                                        value={taxes}
                                        onChange={(e) => setTaxes(handleNumberInput(e.target.value))}
                                        placeholder="enter Taxes"
                                        className="flex-1 px-4 py-3 text-sm text-[#727A90] bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div className="mb-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#25C889] transition-colors"
                            >
                                {imagePreview ? (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-center mb-4">
                                            <div className=" flex items-center justify-center">
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="36" height="36" rx="18" fill="#42DA82" fill-opacity="0.1" />
                                                    <g clip-path="url(#clip0_2082_590)">
                                                        <path d="M17.4147 18.3572C17.229 18.1714 17.0085 18.0239 16.7657 17.9234C16.523 17.8228 16.2628 17.771 16.0001 17.771C15.7373 17.771 15.4771 17.8228 15.2344 17.9234C14.9917 18.0239 14.7711 18.1714 14.5854 18.3572L10.0254 22.9172C10.087 23.7533 10.462 24.5353 11.0753 25.1068C11.6886 25.6783 12.4951 25.9973 13.3334 25.9999H22.6667C23.3199 25.9998 23.9584 25.8066 24.5021 25.4446L17.4147 18.3572Z" fill="#25C889" />
                                                        <path d="M21.9998 15.3337C22.7362 15.3337 23.3332 14.7367 23.3332 14.0003C23.3332 13.2639 22.7362 12.667 21.9998 12.667C21.2635 12.667 20.6665 13.2639 20.6665 14.0003C20.6665 14.7367 21.2635 15.3337 21.9998 15.3337Z" fill="#25C889" />
                                                        <path d="M22.6667 10H13.3333C12.4496 10.0011 11.6024 10.3526 10.9775 10.9775C10.3526 11.6024 10.0011 12.4496 10 13.3333L10 21.0573L13.6427 17.4147C13.9522 17.105 14.3197 16.8594 14.7242 16.6919C15.1287 16.5243 15.5622 16.438 16 16.438C16.4378 16.438 16.8713 16.5243 17.2758 16.6919C17.6803 16.8594 18.0478 17.105 18.3573 17.4147L25.4447 24.502C25.8067 23.9583 25.9999 23.3198 26 22.6667V13.3333C25.9989 12.4496 25.6474 11.6024 25.0225 10.9775C24.3976 10.3526 23.5504 10.0011 22.6667 10V10ZM22 16.6667C21.4726 16.6667 20.957 16.5103 20.5185 16.2173C20.0799 15.9242 19.7382 15.5078 19.5363 15.0205C19.3345 14.5332 19.2817 13.997 19.3846 13.4798C19.4875 12.9625 19.7414 12.4873 20.1144 12.1144C20.4873 11.7414 20.9625 11.4875 21.4798 11.3846C21.997 11.2817 22.5332 11.3345 23.0205 11.5363C23.5078 11.7382 23.9242 12.0799 24.2173 12.5185C24.5103 12.957 24.6667 13.4726 24.6667 14C24.6667 14.7072 24.3857 15.3855 23.8856 15.8856C23.3855 16.3857 22.7072 16.6667 22 16.6667Z" fill="#25C889" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2082_590">
                                                            <rect width="16" height="16" fill="white" transform="translate(10 10)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                        </div>
                                        <p className="text-sm text-[#6B7280] mb-4">
                                            Drag and drop image here, or click add image
                                        </p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="px-4 py-2 rounded-lg bg-[#E8F9F1] text-[#25C889] text-sm font-semibold hover:bg-[#D1F2E5] transition-colors"
                                >
                                    Attachment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="shrink-0 p-6 pt-4 border-t border-gray-100">
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-3">
                            {/* Cancel Button */}
                            <button
                                onClick={handleClose}
                                className=" flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#6B7280] text-sm font-semibold hover:bg-gray-50 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2082_2836)">
                                        <path d="M10.9425 10.0001L17.8045 3.13811C17.926 3.01237 17.9932 2.84397 17.9916 2.66917C17.9901 2.49438 17.92 2.32717 17.7964 2.20356C17.6728 2.07996 17.5056 2.00984 17.3308 2.00833C17.156 2.00681 16.9876 2.074 16.8619 2.19544L9.99986 9.05744L3.13786 2.19544C3.01212 2.074 2.84372 2.00681 2.66892 2.00833C2.49413 2.00984 2.32692 2.07996 2.20331 2.20356C2.07971 2.32717 2.00959 2.49438 2.00807 2.66917C2.00656 2.84397 2.07375 3.01237 2.19519 3.13811L9.05719 10.0001L2.19519 16.8621C2.07021 16.9871 2 17.1567 2 17.3334C2 17.5102 2.07021 17.6798 2.19519 17.8048V17.8048C2.32021 17.9298 2.48975 18 2.66652 18C2.8433 18 3.01284 17.9298 3.13786 17.8048L9.99986 10.9428L16.8619 17.8048C16.9869 17.9298 17.1564 18 17.3332 18C17.51 18 17.6795 17.9298 17.8045 17.8048C17.9295 17.6798 17.9997 17.5102 17.9997 17.3334C17.9997 17.1567 17.9295 16.9871 17.8045 16.8621L10.9425 10.0001Z" fill="#727A90" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2082_2836">
                                            <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Cancel
                            </button>

                            {/* Add Service Button */}
                            <button
                                onClick={handleAdd}
                                className=" flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25C889] text-white text-sm font-semibold hover:bg-[#20B578] transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1636_5240)">
                                        <path d="M19.3333 11.3333H12.6667V4.66667C12.6667 4.48986 12.5964 4.32029 12.4714 4.19526C12.3464 4.07024 12.1768 4 12 4V4C11.8232 4 11.6536 4.07024 11.5286 4.19526C11.4036 4.32029 11.3333 4.48986 11.3333 4.66667V11.3333H4.66667C4.48986 11.3333 4.32029 11.4036 4.19526 11.5286C4.07024 11.6536 4 11.8232 4 12V12C4 12.1768 4.07024 12.3464 4.19526 12.4714C4.32029 12.5964 4.48986 12.6667 4.66667 12.6667H11.3333V19.3333C11.3333 19.5101 11.4036 19.6797 11.5286 19.8047C11.6536 19.9298 11.8232 20 12 20C12.1768 20 12.3464 19.9298 12.4714 19.8047C12.5964 19.6797 12.6667 19.5101 12.6667 19.3333V12.6667H19.3333C19.5101 12.6667 19.6797 12.5964 19.8047 12.4714C19.9298 12.3464 20 12.1768 20 12C20 11.8232 19.9298 11.6536 19.8047 11.5286C19.6797 11.4036 19.5101 11.3333 19.3333 11.3333Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1636_5240">
                                            <rect width="16" height="16" fill="white" transform="translate(4 4)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Add Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

