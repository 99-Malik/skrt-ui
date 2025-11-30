"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, DollarSign, Wrench, Star, Ban } from "lucide-react";
import Card from "@/components/ManageUsers/Card/Page";
import { ComponentSvg } from "@/components/Svgs/ComponentSvg";
import BlockUserModal from "./BlockUserModal";

interface User {
    id: number;
    name: string;
    type: string;
    email: string;
    date: string;
    avatar: string;
}

interface ViewProfileProps {
    user: User | null;
    onBack: () => void;
}

export default function ViewProfile({ user, onBack }: ViewProfileProps) {
    const [activeTab, setActiveTab] = useState<"activity" | "profile">("activity");
    const [imageError, setImageError] = useState(false);
    const [licenseImageError, setLicenseImageError] = useState(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    if (!user) return null;

    const handleBlockUser = () => {
        // Handle block user logic here
        console.log("Blocking user:", user.id);
        setIsBlockModalOpen(false);
        // Add your block user API call here
    };

    // Activity Details Cards Data
    const TotalServicesIcon = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1632_26601)">
                <path d="M6.72375 18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.316071 16.5587 0 15.7956 0 15V11.25C0 10.4544 0.316071 9.69129 0.87868 9.12868C1.44129 8.56607 2.20435 8.25 3 8.25H9.64275C10.0487 8.25019 10.4476 8.35516 10.8011 8.55474C11.1545 8.75433 11.4505 9.04177 11.6603 9.38925L14.073 6.738C14.2726 6.51854 14.5134 6.34057 14.7818 6.21425C15.0502 6.08792 15.3409 6.01574 15.6372 6.00181C15.9335 5.98787 16.2296 6.03248 16.5087 6.13306C16.7877 6.23364 17.0442 6.38823 17.2635 6.588C17.701 6.98995 17.9632 7.54762 17.9937 8.14097C18.0241 8.73431 17.8203 9.31589 17.4263 9.7605L12.3263 15.4882C11.6221 16.278 10.759 16.91 9.79345 17.3429C8.82794 17.7758 7.78185 17.9997 6.72375 18ZM3 9.75C2.60218 9.75 2.22064 9.90804 1.93934 10.1893C1.65804 10.4706 1.5 10.8522 1.5 11.25V15C1.5 15.3978 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H6.72375C7.56969 16.4997 8.40601 16.3206 9.1779 15.9744C9.94979 15.6283 10.6398 15.1229 11.2028 14.4915L16.3065 8.763C16.439 8.61374 16.5076 8.41842 16.4975 8.21908C16.4874 8.01974 16.3994 7.83235 16.2525 7.69725C16.1031 7.56294 15.9072 7.49218 15.7065 7.5C15.607 7.50421 15.5093 7.5282 15.4192 7.57056C15.329 7.61293 15.2482 7.67282 15.1815 7.74675L11.862 11.4C11.7163 11.8033 11.4638 12.1595 11.1314 12.4306C10.7991 12.7016 10.3994 12.8773 9.975 12.939L6.10425 13.4925C5.90733 13.5207 5.70725 13.4696 5.54803 13.3503C5.38881 13.2311 5.2835 13.0534 5.25525 12.8565C5.22701 12.6596 5.27814 12.4595 5.39742 12.3003C5.51669 12.1411 5.69433 12.0357 5.89125 12.0075L9.76275 11.4548C9.97765 11.4247 10.1731 11.3142 10.3097 11.1456C10.4463 10.977 10.5138 10.7628 10.4986 10.5464C10.4833 10.3299 10.3865 10.1273 10.2276 9.97948C10.0688 9.83166 9.85974 9.74964 9.64275 9.75H3ZM8.25 6.8055C7.91007 6.80641 7.58005 6.69103 7.31475 6.4785C6.03075 5.448 4.5 3.9 4.5 2.4C4.48159 1.78377 4.70796 1.18533 5.12961 0.735573C5.55126 0.285813 6.13387 0.0213392 6.75 0C7.31051 0.00218312 7.84828 0.221863 8.25 0.61275C8.65172 0.221863 9.18949 0.00218312 9.75 0C10.3661 0.0213392 10.9487 0.285813 11.3704 0.735573C11.792 1.18533 12.0184 1.78377 12 2.4C12 3.9 10.4693 5.448 9.1845 6.47925C8.9193 6.69135 8.58958 6.80646 8.25 6.8055ZM6.75 1.5C6.53201 1.52187 6.33131 1.62841 6.19106 1.79672C6.05081 1.96502 5.9822 2.18164 6 2.4C6 3.075 6.86325 4.1925 8.2545 5.30925C9.63675 4.1925 10.5 3.075 10.5 2.4C10.5178 2.18164 10.4492 1.96502 10.3089 1.79672C10.1687 1.62841 9.96799 1.52187 9.75 1.5C9.53201 1.52187 9.33132 1.62841 9.19106 1.79672C9.05081 1.96502 8.9822 2.18164 9 2.4C9 2.59891 8.92098 2.78968 8.78033 2.93033C8.63968 3.07098 8.44891 3.15 8.25 3.15C8.05109 3.15 7.86032 3.07098 7.71967 2.93033C7.57902 2.78968 7.5 2.59891 7.5 2.4C7.5178 2.18164 7.44919 1.96502 7.30894 1.79672C7.16869 1.62841 6.96799 1.52187 6.75 1.5Z" fill="currentColor"/>
            </g>
            <defs>
                <clipPath id="clip0_1632_26601">
                    <rect width="18" height="18" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

    const AvgFeedbackIcon = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1632_26609)">
                <path d="M0.995151 9.30021L3.66515 11.2502L2.65115 14.3905C2.48728 14.8775 2.48521 15.4045 2.64523 15.8928C2.80526 16.3811 3.11881 16.8046 3.53915 17.1002C3.95229 17.4053 4.45295 17.5687 4.96652 17.5662C5.48009 17.5636 5.97908 17.3952 6.38915 17.086L8.9999 15.1645L11.6114 17.0837C12.0238 17.3871 12.5217 17.5518 13.0337 17.5543C13.5456 17.5568 14.0451 17.3969 14.4605 17.0976C14.8758 16.7983 15.1855 16.375 15.3451 15.8886C15.5047 15.4021 15.5059 14.8776 15.3487 14.3905L14.3347 11.2502L17.0047 9.30021C17.4165 8.99909 17.7227 8.57552 17.8794 8.09C18.0361 7.60448 18.0354 7.08185 17.8774 6.59675C17.7194 6.11165 17.4121 5.6889 16.9994 5.38889C16.5868 5.08887 16.0898 4.92694 15.5797 4.92621H12.2999L11.3047 1.82421C11.1481 1.33593 10.8406 0.90997 10.4264 0.607759C10.0122 0.305547 9.51265 0.1427 8.9999 0.1427C8.48715 0.1427 7.98765 0.305547 7.57342 0.607759C7.1592 0.90997 6.85166 1.33593 6.69515 1.82421L5.6999 4.92621H2.42315C1.91296 4.92694 1.41604 5.08887 1.00339 5.38889C0.590727 5.6889 0.283431 6.11165 0.125392 6.59675C-0.0326479 7.08185 -0.0333474 7.60448 0.123393 8.09C0.280133 8.57552 0.586296 8.99909 0.99815 9.30021H0.995151Z" fill="currentColor"/>
            </g>
            <defs>
                <clipPath id="clip0_1632_26609">
                    <rect width="18" height="18" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

    const activityCards = [
        { title: "Total Amount Earned", count: "750", icon: DollarSign, variant: "green" as const },
        { title: "Total Services", count: "31,300", icon: TotalServicesIcon, variant: "red" as const },
        { title: "Avg Feedback", count: "4.0", icon: AvgFeedbackIcon, variant: "golden" as const },
    ];

    const requestorActivityCards = [
        { title: "Total Amount Spent", count: "750", icon: DollarSign, variant: "green" as const },
        { title: "Total Services Acquired", count: "31,300", icon: TotalServicesIcon, variant: "red" as const },
    ];

    // Recent Services Data
    const recentServices = [
        {
            serviceType: "Tire Change",
            date: "26/05/2025",
            status: "Completed",
            serviceFee: "$15",
            assistLocation: "USA,califonia street 1250",
            responder: "John Doe",
            car: "Blue Sedan Toyota Camry",
            userPrice: "$19",
        },
        {
            serviceType: "Tire Change",
            date: "26/05/2025",
            status: "Completed",
            serviceFee: "$15",
            assistLocation: "USA,califonia street 1250",
            responder: "John Doe",
            car: "Blue Sedan Toyota Camry",
            userPrice: "$19",
        },
        {
            serviceType: "Tire Change",
            date: "26/05/2025",
            status: "Completed",
            serviceFee: "$15",
            assistLocation: "USA,califonia street 1250",
            responder: "John Doe",
            car: "Blue Sedan Toyota Camry",
            userPrice: "$19",
        },
        {
            serviceType: "Tire Change",
            date: "26/05/2025",
            status: "Completed",
            serviceFee: "$15",
            assistLocation: "USA,califonia street 1250",
            responder: "John Doe",
            car: "Blue Sedan Toyota Camry",
            userPrice: "$19",
        },
    ];

    return (
        <div className="space-y-6 font-sans w-full">
            {/* Header with Back Arrow, Title, Badge, and Block Button */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.87736 8.3858L4.74736 12.2958C4.84032 12.3895 4.95092 12.4639 5.07278 12.5147C5.19464 12.5655 5.32535 12.5916 5.45736 12.5916C5.58937 12.5916 5.72008 12.5655 5.84194 12.5147C5.9638 12.4639 6.0744 12.3895 6.16736 12.2958C6.26109 12.2028 6.33548 12.0922 6.38625 11.9704C6.43702 11.8485 6.46316 11.7178 6.46316 11.5858C6.46316 11.4538 6.43702 11.3231 6.38625 11.2012C6.33548 11.0794 6.26109 10.9688 6.16736 10.8758L2.60736 7.2958H22.9974C23.2626 7.2958 23.5169 7.19044 23.7045 7.0029C23.892 6.81537 23.9974 6.56101 23.9974 6.2958C23.9974 6.03058 23.892 5.77623 23.7045 5.58869C23.5169 5.40116 23.2626 5.2958 22.9974 5.2958H2.54736L6.16736 1.6758C6.34465 1.48982 6.44355 1.24274 6.44355 0.985798C6.44355 0.728857 6.34465 0.481775 6.16736 0.295798C6.0744 0.20207 5.9638 0.127675 5.84194 0.0769067C5.72008 0.026138 5.58937 0 5.45736 0C5.32535 0 5.19464 0.026138 5.07278 0.0769067C4.95092 0.127675 4.84032 0.20207 4.74736 0.295798L0.87736 4.1458C0.315558 4.7083 0 5.4708 0 6.2658C0 7.0608 0.315558 7.8233 0.87736 8.3858Z" fill="#24282E" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-[#1F2937]">User Profile</h2>
                            <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-normal ${
                                user.type === "Requestor" ? "bg-[#25C889]" : "bg-[#019BF4]"
                            }`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                {user.type}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsBlockModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FF383C] bg-[#FFF1F0] text-[#FF383C] text-sm font-semibold hover:bg-[#FFE5E3] transition-colors"
                    >
                        Block User
                        <Ban size={16} />
                    </button>
                </div>
                <p className="text-sm text-[#6B7280] ml-[48px]">View all the User details here.</p>
            </div>

            {/* Subtitle */}


            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "activity"
                            ? "text-[#25C889] border-[#25C889]"
                            : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Activity Details
                    </button>
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "profile"
                            ? "text-[#25C889] border-[#25C889]"
                            : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Profile Info
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {user.type === "Requestor" && activeTab === "profile" ? (
                    // Requestor Profile Layout (Profile Info tab)
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                        <g clipPath="url(#clip0_1632_18593)">
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
                    </div>
                ) : user.type === "Requestor" && activeTab === "activity" ? (
                    // Requestor Activity Details (2 cards only)
                    <div className="space-y-6">
                        {/* Activity Details Summary */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#1F2937]">Activity Details</h3>
                                <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs font-normal text-[#6B7280] cursor-pointer">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2082_2667)">
                                            <path d="M2 14.6667C2.00106 15.5505 2.35259 16.3977 2.97748 17.0226C3.60237 17.6475 4.4496 17.999 5.33333 18.0001H14.6667C15.5504 17.999 16.3976 17.6475 17.0225 17.0226C17.6474 16.3977 17.9989 15.5505 18 14.6667V8.66675H2V14.6667ZM13.3333 11.6667C13.5311 11.6667 13.7245 11.7254 13.8889 11.8353C14.0534 11.9452 14.1815 12.1013 14.2572 12.2841C14.3329 12.4668 14.3527 12.6679 14.3141 12.8618C14.2755 13.0558 14.1803 13.234 14.0404 13.3739C13.9006 13.5137 13.7224 13.6089 13.5284 13.6475C13.3344 13.6861 13.1334 13.6663 12.9507 13.5906C12.7679 13.5149 12.6117 13.3868 12.5019 13.2223C12.392 13.0579 12.3333 12.8645 12.3333 12.6667C12.3333 12.4015 12.4387 12.1472 12.6262 11.9596C12.8138 11.7721 13.0681 11.6667 13.3333 11.6667ZM10 11.6667C10.1978 11.6667 10.3911 11.7254 10.5556 11.8353C10.72 11.9452 10.8482 12.1013 10.9239 12.2841C10.9996 12.4668 11.0194 12.6679 10.9808 12.8618C10.9422 13.0558 10.847 13.234 10.7071 13.3739C10.5673 13.5137 10.3891 13.6089 10.1951 13.6475C10.0011 13.6861 9.80004 13.6663 9.61732 13.5906C9.43459 13.5149 9.27841 13.3868 9.16853 13.2223C9.05865 13.0579 9 12.8645 9 12.6667C9 12.4015 9.10536 12.1472 9.29289 11.9596C9.48043 11.7721 9.73478 11.6667 10 11.6667ZM6.66667 11.6667C6.86445 11.6667 7.05779 11.7254 7.22224 11.8353C7.38669 11.9452 7.51486 12.1013 7.59055 12.2841C7.66623 12.4668 7.68604 12.6679 7.64745 12.8618C7.60887 13.0558 7.51363 13.234 7.37377 13.3739C7.23392 13.5137 7.05574 13.6089 6.86176 13.6475C6.66778 13.6861 6.46671 13.6663 6.28398 13.5906C6.10126 13.5149 5.94508 13.3868 5.8352 13.2223C5.72532 13.0579 5.66667 12.8645 5.66667 12.6667C5.66667 12.4015 5.77202 12.1472 5.95956 11.9596C6.1471 11.7721 6.40145 11.6667 6.66667 11.6667Z" fill="#727A90" />
                                            <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2082_2667">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>This Month</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {requestorActivityCards.map((card) => (
                                    <Card key={card.title} {...card} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Services */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1F2937] mb-4">Recent Services</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentServices.map((service, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6"
                                    >
                                        {/* Header Section */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-base font-bold text-[#1F2937] mb-1">{service.serviceType}</h4>
                                                <span className="text-xs text-[#6B7280]">{service.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 rounded-full bg-[#E6F6FF] text-[#00A3FF] text-xs font-semibold">
                                                    {service.status}
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-white text-[#25C889] text-xs font-semibold">
                                                    {service.serviceFee}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Assist Details Section */}
                                        <div className="border-t border-gray-200 pt-4 mb-4">
                                            <h5 className="text-sm font-bold text-[#1F2937] mb-3">Assist Details</h5>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Assist Location</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.assistLocation}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Responder</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.responder}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Car</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.car}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h5 className="text-sm font-bold text-[#1F2937] mb-3">Price</h5>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-[#6B7280]">User Price</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">{service.userPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : activeTab === "activity" ? (
                    <div className="space-y-6">
                        {/* Activity Details Summary */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#1F2937]">Activity Details</h3>
                                <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs font-normal text-[#6B7280] cursor-pointer">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2082_2667)">
                                            <path d="M2 14.6667C2.00106 15.5505 2.35259 16.3977 2.97748 17.0226C3.60237 17.6475 4.4496 17.999 5.33333 18.0001H14.6667C15.5504 17.999 16.3976 17.6475 17.0225 17.0226C17.6474 16.3977 17.9989 15.5505 18 14.6667V8.66675H2V14.6667ZM13.3333 11.6667C13.5311 11.6667 13.7245 11.7254 13.8889 11.8353C14.0534 11.9452 14.1815 12.1013 14.2572 12.2841C14.3329 12.4668 14.3527 12.6679 14.3141 12.8618C14.2755 13.0558 14.1803 13.234 14.0404 13.3739C13.9006 13.5137 13.7224 13.6089 13.5284 13.6475C13.3344 13.6861 13.1334 13.6663 12.9507 13.5906C12.7679 13.5149 12.6117 13.3868 12.5019 13.2223C12.392 13.0579 12.3333 12.8645 12.3333 12.6667C12.3333 12.4015 12.4387 12.1472 12.6262 11.9596C12.8138 11.7721 13.0681 11.6667 13.3333 11.6667ZM10 11.6667C10.1978 11.6667 10.3911 11.7254 10.5556 11.8353C10.72 11.9452 10.8482 12.1013 10.9239 12.2841C10.9996 12.4668 11.0194 12.6679 10.9808 12.8618C10.9422 13.0558 10.847 13.234 10.7071 13.3739C10.5673 13.5137 10.3891 13.6089 10.1951 13.6475C10.0011 13.6861 9.80004 13.6663 9.61732 13.5906C9.43459 13.5149 9.27841 13.3868 9.16853 13.2223C9.05865 13.0579 9 12.8645 9 12.6667C9 12.4015 9.10536 12.1472 9.29289 11.9596C9.48043 11.7721 9.73478 11.6667 10 11.6667ZM6.66667 11.6667C6.86445 11.6667 7.05779 11.7254 7.22224 11.8353C7.38669 11.9452 7.51486 12.1013 7.59055 12.2841C7.66623 12.4668 7.68604 12.6679 7.64745 12.8618C7.60887 13.0558 7.51363 13.234 7.37377 13.3739C7.23392 13.5137 7.05574 13.6089 6.86176 13.6475C6.66778 13.6861 6.46671 13.6663 6.28398 13.5906C6.10126 13.5149 5.94508 13.3868 5.8352 13.2223C5.72532 13.0579 5.66667 12.8645 5.66667 12.6667C5.66667 12.4015 5.77202 12.1472 5.95956 11.9596C6.1471 11.7721 6.40145 11.6667 6.66667 11.6667Z" fill="#727A90" />
                                            <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2082_2667">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>This Month</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {activityCards.map((card) => (
                                    <Card key={card.title} {...card} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Services */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1F2937] mb-4">Recent Services</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentServices.map((service, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6"
                                    >
                                        {/* Header Section */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-base font-bold text-[#1F2937] mb-1">{service.serviceType}</h4>
                                                <span className="text-xs text-[#6B7280]">{service.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 rounded-full bg-[#E6F6FF] text-[#00A3FF] text-xs font-semibold">
                                                    {service.status}
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-white text-[#25C889] text-xs font-semibold">
                                                    {service.serviceFee}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Assist Details Section */}
                                        <div className="border-t border-gray-200 pt-4 mb-4">
                                            <h5 className="text-sm font-bold text-[#1F2937] mb-3">Assist Details</h5>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Assist Location</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.assistLocation}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Responder</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.responder}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[#6B7280]">Car</p>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{service.car}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h5 className="text-sm font-bold text-[#1F2937] mb-3">Price</h5>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-[#6B7280]">User Price</p>
                                                <p className="text-sm font-semibold text-[#1F2937]">{service.userPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                        <g clipPath="url(#clip0_1632_18593)">
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
                                <p className="text-xl text-[#1F2937] font-bold mb-4">License Image</p>
                                <div className="w-full h-48 relative rounded-lg overflow-hidden flex items-center justify-center mb-4">
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
                                <p className="underline text-sm text-[#727A90] text-center">license.png</p>
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
                            <div className="bg-white border h-fit border-gray-200 rounded-2xl p-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-[#1F2937]">Application Info</h3>
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H6L8 4H12C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4Z" fill="#727A90"/>
                                            <path d="M6 2V4H8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        <span className="text-xs text-[#6B7280]">Work in a Company</span>
                                    </div>
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    {/* Business Name | Email Address */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-1">Business Name</p>
                                            <p className="text-sm font-semibold text-[#1F2937]">Motor Guage Repairs</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-1">Email Address</p>
                                            <p className="text-sm font-semibold text-[#1F2937]">info123@gmail.com</p>
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
                                            <p className="text-sm font-semibold text-[#1F2937]">Los Angeles California , street 2</p>
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
                                    {/* Company TIN */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2">
                                        <div>
                                            <p className="text-xs text-[#6B7280] mb-1">Company TIN</p>
                                            <p className="text-sm font-semibold text-[#1F2937]">101-658816-35131</p>
                                        </div>
                                        <div></div>
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
                )}
            </div>

            {/* Block User Modal */}
            <BlockUserModal
                isOpen={isBlockModalOpen}
                onClose={() => setIsBlockModalOpen(false)}
                onConfirm={handleBlockUser}
            />
        </div>
    );
}
