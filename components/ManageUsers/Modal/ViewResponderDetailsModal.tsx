"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check, MessageCircle } from "lucide-react";
import { ComponentSvg } from "@/components/Svgs/ComponentSvg";
interface UserData {
    id: number;
    name: string;
    type: string;
    email: string;
    date: string;
    avatar: string;
}

interface ViewResponderDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData | null;
}

export default function ViewResponderDetailsModal({ isOpen, onClose, user }: ViewResponderDetailsProps) {
    const [imageError, setImageError] = useState(false);
    const [licenseImageError, setLicenseImageError] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setImageError(false);
            setLicenseImageError(false);
        }
    }, [isOpen, user]);

    if (!isOpen || !user) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/30 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-4 bottom-4 w-full md:w-[70%] right-4 left-4 md:left-auto  bg-white z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold text-[#1F2937]">View Application Details</h2>
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#019BF4] text-white text-xs font-normal">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                   Responder
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                    <g clip-path="url(#clip0_1632_19186)">
                                        <path d="M16.9425 16L23.8045 9.13799C23.926 9.01225 23.9932 8.84385 23.9916 8.66905C23.9901 8.49425 23.92 8.32705 23.7964 8.20344C23.6728 8.07984 23.5056 8.00972 23.3308 8.0082C23.156 8.00668 22.9876 8.07388 22.8619 8.19532L15.9999 15.0573L9.13786 8.19532C9.01212 8.07388 8.84372 8.00668 8.66892 8.0082C8.49413 8.00972 8.32692 8.07984 8.20331 8.20344C8.07971 8.32705 8.00959 8.49425 8.00807 8.66905C8.00656 8.84385 8.07375 9.01225 8.19519 9.13799L15.0572 16L8.19519 22.862C8.07021 22.987 8 23.1565 8 23.3333C8 23.5101 8.07021 23.6796 8.19519 23.8047C8.32021 23.9296 8.48975 23.9998 8.66652 23.9998C8.8433 23.9998 9.01284 23.9296 9.13786 23.8047L15.9999 16.9427L22.8619 23.8047C22.9869 23.9296 23.1564 23.9998 23.3332 23.9998C23.51 23.9998 23.6795 23.9296 23.8045 23.8047C23.9295 23.6796 23.9997 23.5101 23.9997 23.3333C23.9997 23.1565 23.9295 22.987 23.8045 22.862L16.9425 16Z" fill="#727A90" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1632_19186">
                                            <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="flex flex-col gap-6">
                                {/* User Profile Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6 relative">
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center">
                                            {imageError ? (
                                                <span className="text-2xl font-bold text-[#6B7280]">
                                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                </span>
                                            ) : (
                                                <Image
                                                src="/images/user-image.png"
                                                alt={user.name}
                                                    fill
                                                    className="object-cover"
                                                    onError={() => setImageError(true)}
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1F2937] mb-1">{user.name}</h3>
                                        <p className="text-sm text-[#6B7280]">Photo</p>
                                    </div>
                                    <button className="absolute top-6 right-6 p-2 cursor-pointer rounded-lg transition-colors">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                            <g clip-path="url(#clip0_1632_18593)">
                                                <path d="M21.3333 8H10.6667C9.95942 8 9.28115 8.28095 8.78105 8.78105C8.28095 9.28115 8 9.95942 8 10.6667V18.6667C8 19.3739 8.28095 20.0522 8.78105 20.5523C9.28115 21.0524 9.95942 21.3333 10.6667 21.3333H12.6L15.5673 23.842C15.6877 23.9439 15.8403 23.9998 15.998 23.9998C16.1557 23.9998 16.3083 23.9439 16.4287 23.842L19.4 21.3333H21.3333C22.0406 21.3333 22.7189 21.0524 23.219 20.5523C23.719 20.0522 24 19.3739 24 18.6667V10.6667C24 9.95942 23.719 9.28115 23.219 8.78105C22.7189 8.28095 22.0406 8 21.3333 8V8ZM12.6667 11.3333H16C16.1768 11.3333 16.3464 11.4036 16.4714 11.5286C16.5964 11.6536 16.6667 11.8232 16.6667 12C16.6667 12.1768 16.5964 12.3464 16.4714 12.4714C16.3464 12.5964 16.1768 12.6667 16 12.6667H12.6667C12.4899 12.6667 12.3203 12.5964 12.1953 12.4714C12.0702 12.3464 12 12.1768 12 12C12 11.8232 12.0702 11.6536 12.1953 11.5286C12.3203 11.4036 12.4899 11.3333 12.6667 11.3333ZM19.3333 18H12.6667C12.4899 18 12.3203 17.9298 12.1953 17.8047C12.0702 17.6797 12 17.5101 12 17.3333C12 17.1565 12.0702 16.987 12.1953 16.8619C12.3203 16.7369 12.4899 16.6667 12.6667 16.6667H19.3333C19.5101 16.6667 19.6797 16.7369 19.8047 16.8619C19.9298 16.987 20 17.1565 20 17.3333C20 17.5101 19.9298 17.6797 19.8047 17.8047C19.6797 17.9298 19.5101 18 19.3333 18ZM19.3333 15.3333H12.6667C12.4899 15.3333 12.3203 15.2631 12.1953 15.1381C12.0702 15.013 12 14.8435 12 14.6667C12 14.4899 12.0702 14.3203 12.1953 14.1953C12.3203 14.0702 12.4899 14 12.6667 14H19.3333C19.5101 14 19.6797 14.0702 19.8047 14.1953C19.9298 14.3203 20 14.4899 20 14.6667C20 14.8435 19.9298 15.013 19.8047 15.1381C19.6797 15.2631 19.5101 15.3333 19.3333 15.3333Z" fill="#727A90" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1632_18593">
                                                    <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>

                                {/* License Image Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6">
                                        <div className="w-full h-48 relative rounded-lg overflow-hidden flex items-center justify-center">
                                            {licenseImageError ? (
                                                <span className="text-sm text-[#6B7280]">License image not available</span>
                                            ) : (
                                                <Image
                                                    src="/images/license-image.png"
                                                    alt="License"
                                                    fill
                                                    className="object-contain"
                                                    onError={() => setLicenseImageError(true)}
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                    <div className="w-full flex justify-center items-center flex-col mt-1">
                                        <p className="text-xl text-[#1F2937] font-bold">License Image</p>
                                        <p className="underline text-sm text-[#727A90]">License.png</p>
                                    </div>
                                </div>

                                {/* Official Application ID Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-[#1F2937] mb-4">Official Application ID</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-1">Official Application ID</p>
                                            <p className="text-sm font-semibold text-[#1F2937]">ID011221</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-1">Application Status</p>
                                            <span className="inline-block px-3 py-1 rounded-full bg-[#FFF4E6] text-[#F59E0B] text-xs font-semibold">
                                                Under Review
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                                {/* Application Info Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-[#1F2937] mb-4">Application Info</h3>
                                    <div className="space-y-2 md:space-y-4">
                                        {/* Full Name | Email Address */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Full Name</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">{user.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Email Address</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">{user.email}</p>
                                            </div>
                                        </div>
                                        {/* Country | Address */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Country</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">United States of America</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Address</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">Los Angeles California, street...</p>
                                            </div>
                                        </div>
                                        {/* State | Zip Code */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">State</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">Florida</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Zip Code</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">36500</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Info Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-[#1F2937] mb-4">Vehicle Info</h3>
                                    <div className="space-y-2 md:space-y-4">
                                        {/* Vehicle Name | Vehicle Color */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Vehicle Name</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">Toyota Highlander</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Vehicle Color</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">Red</p>
                                            </div>
                                        </div>
                                        {/* Vehicle Category | Vehicle Model Year */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Vehicle Category</p>
                                                <div className="flex items-center gap-2">
                                                    <ComponentSvg />
                                                    <p className="text-sm font-semibold text-[#1F2937]">SUV</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Vehicle Model Year</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">2021</p>
                                            </div>
                                        </div>
                                        {/* Vehicle License Plate */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                            <div>
                                                <p className="text-xs text-[#6B7280] mb-1">Vehicle License Plate</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">NYC-5821</p>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Offer Services Card */}
                                <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-[#1F2937] mb-4">Offer Services</h3>
                                    <div className="space-y-4">
                                        {/* Tier 1 */}
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-2">Tier 1</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Tire Change
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Battery Jump Start
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Gas Delivery
                                                </span>
                                            </div>
                                        </div>
                                        {/* Tier 2 */}
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-2">Tier 2</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Tow Mileage
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Electric Charge (EV)
                                                </span>
                                            </div>
                                        </div>
                                        {/* Tier 3 */}
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-2">Tier 3</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 rounded-full bg-[#E8F9F1] text-[#1F2937] text-sm font-medium">
                                                    Tow Mileage
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-4 mt-8 p-6 border-t border-gray-200">
                            <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#25C889] bg-[#E8F9F1] text-[#25C889] text-sm font-semibold hover:bg-[#D1F2E5] transition-colors">

                                Approve
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1632_20138)">
                                        <path d="M14.8792 2.95401L5.6665 12.166C5.60456 12.2282 5.53095 12.2775 5.4499 12.3112C5.36884 12.3449 5.28194 12.3622 5.19417 12.3622C5.1064 12.3622 5.0195 12.3449 4.93844 12.3112C4.85739 12.2775 4.78378 12.2282 4.72184 12.166L1.15917 8.60001C1.09723 8.53782 1.02362 8.48848 0.942566 8.45481C0.861511 8.42114 0.774606 8.40381 0.686837 8.40381C0.599068 8.40381 0.512162 8.42114 0.431107 8.45481C0.350052 8.48848 0.276443 8.53782 0.214503 8.60001C0.152319 8.66194 0.102977 8.73555 0.0693094 8.81661C0.0356416 8.89767 0.0183105 8.98457 0.0183105 9.07234C0.0183105 9.16011 0.0356416 9.24701 0.0693094 9.32807C0.102977 9.40912 0.152319 9.48273 0.214503 9.54467L3.7785 13.108C4.15447 13.4833 4.66397 13.694 5.19517 13.694C5.72637 13.694 6.23587 13.4833 6.61184 13.108L15.8238 3.89801C15.8859 3.83608 15.9352 3.76251 15.9688 3.68152C16.0024 3.60052 16.0197 3.5137 16.0197 3.42601C16.0197 3.33832 16.0024 3.25149 15.9688 3.17049C15.9352 3.0895 15.8859 3.01593 15.8238 2.95401C15.7619 2.89182 15.6883 2.84248 15.6072 2.80881C15.5262 2.77514 15.4393 2.75781 15.3515 2.75781C15.2637 2.75781 15.1768 2.77514 15.0958 2.80881C15.0147 2.84248 14.9411 2.89182 14.8792 2.95401Z" fill="#25C889" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1632_20138">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>
                            <button className="flex items-center gap-2 w-fit px-3 py-3 rounded-xl border border-[#FF383C] bg-[#FFF1F0] text-[#FF4D4F] text-sm font-semibold hover:bg-[#FFE5E3] transition-colors">

                                Reject
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9999 5.99988C13.8749 5.8749 13.7053 5.80469 13.5285 5.80469C13.3518 5.80469 13.1822 5.8749 13.0572 5.99988L9.99988 9.05721L6.94255 5.99988C6.81753 5.8749 6.64799 5.80469 6.47121 5.80469C6.29444 5.80469 6.1249 5.8749 5.99988 5.99988C5.8749 6.1249 5.80469 6.29444 5.80469 6.47121C5.80469 6.64799 5.8749 6.81753 5.99988 6.94255L9.05721 9.99988L5.99988 13.0572C5.8749 13.1822 5.80469 13.3518 5.80469 13.5285C5.80469 13.7053 5.8749 13.8749 5.99988 13.9999C6.1249 14.1249 6.29444 14.1951 6.47121 14.1951C6.64799 14.1951 6.81753 14.1249 6.94255 13.9999L9.99988 10.9425L13.0572 13.9999C13.1822 14.1249 13.3518 14.1951 13.5285 14.1951C13.7053 14.1951 13.8749 14.1249 13.9999 13.9999C14.1249 13.8749 14.1951 13.7053 14.1951 13.5285C14.1951 13.3518 14.1249 13.1822 13.9999 13.0572L10.9425 9.99988L13.9999 6.94255C14.1249 6.81753 14.1951 6.64799 14.1951 6.47121C14.1951 6.29444 14.1249 6.1249 13.9999 5.99988Z" fill="#FF383C" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

