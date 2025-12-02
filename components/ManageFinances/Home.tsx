"use client";

import React, { useState } from "react";
import Card from "./Card/Card";
import Table from "./Table/Table";
import Analytics from "./Analytics";

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

export default function Home() {
    const [activeTab, setActiveTab] = useState<"transactions" | "analytics">("transactions");

    // Sample data - replace with actual data from API
    const transactions: Transaction[] = [
        {
            id: "1",
            userName: "John Bushmill",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John+Bushmill",
            userType: "Requestor",
            paymentDetails: "****2658",
            dated: "12 Dec 2023 03:00 PM",
            amount: "$500.00",
            category: "Subscription",
        },
        {
            id: "2",
            userName: "Ilham Budi Agung",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ilham+Budi+Agung",
            userType: "Responder",
            paymentDetails: "****2661",
            dated: "16 Dec 2023 09:00 AM",
            amount: "$500.00",
            category: "Assistance",
        },
        {
            id: "3",
            userName: "Mohammad Karim",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad+Karim",
            userType: "Responder",
            paymentDetails: "****2660",
            dated: "14 Dec 2023 10:30 AM",
            amount: "$500.00",
            category: "Assistance",
        },
        {
            id: "4",
            userName: "Linda Blair",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda+Blair",
            userType: "Requestor",
            paymentDetails: "****2662",
            dated: "13 Dec 2023 04:15 PM",
            amount: "$500.00",
            category: "Subscription",
        },
        {
            id: "5",
            userName: "Josh Adam",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Josh+Adam",
            userType: "Responder",
            paymentDetails: "****2663",
            dated: "17 Dec 2023 02:30 PM",
            amount: "$500.00",
            category: "Assistance",
        },
    ];

    const withdrawals: Withdrawal[] = [
        {
            id: "1",
            userName: "John Bushmill",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John+Bushmill",
            paymentDetails: "****2658",
            dated: "12 Dec 2023 03:00 PM",
            amount: "$500.00",
            status: "Completed",
        },
        {
            id: "2",
            userName: "Ilham Budi Agung",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ilham+Budi+Agung",
            paymentDetails: "****2661",
            dated: "16 Dec 2023 09:00 AM",
            amount: "$500.00",
            status: "Failed",
        },
        {
            id: "3",
            userName: "Mohammad Karim",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad+Karim",
            paymentDetails: "****2660",
            dated: "14 Dec 2023 10:30 AM",
            amount: "$500.00",
            status: "Completed",
        },
        {
            id: "4",
            userName: "Linda Blair",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda+Blair",
            paymentDetails: "****2662",
            dated: "13 Dec 2023 04:15 PM",
            amount: "$500.00",
            status: "Completed",
        },
        {
            id: "5",
            userName: "Josh Adam",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Josh+Adam",
            paymentDetails: "****2663",
            dated: "17 Dec 2023 02:30 PM",
            amount: "$500.00",
            status: "Failed",
        },
        {
            id: "6",
            userName: "Josh Adam",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Josh+Adam+2",
            paymentDetails: "****2659",
            dated: "15 Dec 2023 01:45 PM",
            amount: "$500.00",
            status: "Failed",
        },
    ];

    return (
        <div className="space-y-6 font-sans w-full">
            {/* Header with Export and Date Filter */}
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-[#1F2937]">Manage Finance</h1>
                <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#25C889] text-white text-sm font-medium hover:bg-[#20B578] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2082_1234)">
                            <path d="M6.58552 12.0813C6.77126 12.2672 6.99179 12.4146 7.23453 12.5152C7.47726 12.6158 7.73744 12.6676 8.00019 12.6676C8.26294 12.6676 8.52312 12.6158 8.76585 12.5152C9.00859 12.4146 9.22912 12.2672 9.41486 12.0813L11.5555 9.94067C11.6703 9.81373 11.7319 9.64752 11.7275 9.47644C11.7231 9.30536 11.6531 9.14253 11.5319 9.02165C11.4108 8.90077 11.2478 8.8311 11.0767 8.82707C10.9056 8.82304 10.7396 8.88496 10.6129 9L8.66219 10.9513L8.66686 0.666667C8.66686 0.489856 8.59662 0.320286 8.4716 0.195262C8.34657 0.0702379 8.177 0 8.00019 0V0C7.82338 0 7.65381 0.0702379 7.52879 0.195262C7.40376 0.320286 7.33352 0.489856 7.33352 0.666667L7.32752 10.9387L5.38752 9C5.26243 8.875 5.0928 8.8048 4.91596 8.80487C4.73911 8.80493 4.56953 8.87524 4.44452 9.00033C4.31952 9.12543 4.24933 9.29506 4.24939 9.4719C4.24945 9.64875 4.31976 9.81833 4.44486 9.94333L6.58552 12.0813Z" fill="white" />
                            <path d="M15.3333 10.6665C15.1565 10.6665 14.987 10.7367 14.8619 10.8618C14.7369 10.9868 14.6667 11.1564 14.6667 11.3332V13.9998C14.6667 14.1766 14.5964 14.3462 14.4714 14.4712C14.3464 14.5963 14.1768 14.6665 14 14.6665H2C1.82319 14.6665 1.65362 14.5963 1.5286 14.4712C1.40357 14.3462 1.33333 14.1766 1.33333 13.9998V11.3332C1.33333 11.1564 1.2631 10.9868 1.13807 10.8618C1.01305 10.7367 0.843478 10.6665 0.666667 10.6665V10.6665C0.489856 10.6665 0.320286 10.7367 0.195262 10.8618C0.0702379 10.9868 0 11.1564 0 11.3332L0 13.9998C0 14.5303 0.210714 15.039 0.585786 15.414C0.960859 15.7891 1.46957 15.9998 2 15.9998H14C14.5304 15.9998 15.0391 15.7891 15.4142 15.414C15.7893 15.039 16 14.5303 16 13.9998V11.3332C16 11.1564 15.9298 10.9868 15.8047 10.8618C15.6797 10.7367 15.5101 10.6665 15.3333 10.6665Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2082_1234">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-xs font-normal text-[#6B7280] cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2082_170)">
                            <path d="M2 14.6667C2.00106 15.5505 2.35259 16.3977 2.97748 17.0226C3.60237 17.6475 4.4496 17.999 5.33333 18.0001H14.6667C15.5504 17.999 16.3976 17.6475 17.0225 17.0226C17.6474 16.3977 17.9989 15.5505 18 14.6667V8.66675H2V14.6667ZM13.3333 11.6667C13.5311 11.6667 13.7245 11.7254 13.8889 11.8353C14.0534 11.9452 14.1815 12.1013 14.2572 12.2841C14.3329 12.4668 14.3527 12.6679 14.3141 12.8618C14.2755 13.0558 14.1803 13.234 14.0404 13.3739C13.9006 13.5137 13.7224 13.6089 13.5284 13.6475C13.3344 13.6861 13.1334 13.6663 12.9507 13.5906C12.7679 13.5149 12.6117 13.3868 12.5019 13.2223C12.392 13.0579 12.3333 12.8645 12.3333 12.6667C12.3333 12.4015 12.4387 12.1472 12.6262 11.9596C12.8138 11.7721 13.0681 11.6667 13.3333 11.6667ZM10 11.6667C10.1978 11.6667 10.3911 11.7254 10.5556 11.8353C10.72 11.9452 10.8482 12.1013 10.9239 12.2841C10.9996 12.4668 11.0194 12.6679 10.9808 12.8618C10.9422 13.0558 10.847 13.234 10.7071 13.3739C10.5673 13.5137 10.3891 13.6089 10.1951 13.6475C10.0011 13.6861 9.80004 13.6663 9.61732 13.5906C9.43459 13.5149 9.27841 13.3868 9.16853 13.2223C9.05865 13.0579 9 12.8645 9 12.6667C9 12.4015 9.10536 12.1472 9.29289 11.9596C9.48043 11.7721 9.73478 11.6667 10 11.6667ZM6.66667 11.6667C6.86445 11.6667 7.05779 11.7254 7.22224 11.8353C7.38669 11.9452 7.51486 12.1013 7.59055 12.2841C7.66623 12.4668 7.68604 12.6679 7.64745 12.8618C7.60887 13.0558 7.51363 13.234 7.37377 13.3739C7.23392 13.5137 7.05574 13.6089 6.86176 13.6475C6.66778 13.6861 6.46671 13.6663 6.28398 13.5906C6.10126 13.5149 5.94508 13.3868 5.8352 13.2223C5.72532 13.0579 5.66667 12.8645 5.66667 12.6667C5.66667 12.4015 5.77202 12.1472 5.95956 11.9596C6.1471 11.7721 6.40145 11.6667 6.66667 11.6667Z" fill="#727A90" />
                            <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2082_170">
                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Last 10 Days</span>
                </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "transactions"
                                ? "text-[#1F2937] border-[#25C889]"
                                : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Transactions Details
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`pb-3 px-1 text-sm font-semibold transition-colors border-b-2 ${activeTab === "analytics"
                                ? "text-[#1F2937] border-[#25C889]"
                                : "text-[#6B7280] border-transparent"
                            }`}
                    >
                        Analytics
                    </button>
                </div>
            </div>

            {activeTab === "transactions" ? (
                <>
                    {/* Summary Cards */}
                    <div className="flex md:flex-col lg:flex-row gap-4">
                        <Card
                            title="Total Transactions"
                            dateRange="2 Jul - Today"
                            value="8000"
                            percentage="10%"
                            trend="up"
                            trendValue="+220 today"
                            chartColor="#25C889"
                            iconColor="#10B981"
                            iconType="money"
                            chartData={[45, 52, 48, 61, 55, 68, 72, 65, 78, 82]}
                        />
                        <Card
                            title="Total Earnings"
                            dateRange="2 Jul - Today"
                            value="$21,800"
                            percentage="10%"
                            trend="up"
                            trendValue="+$355 today"
                            chartColor="#F05D3D"
                            iconColor="#EF4444"
                            iconType="wallet"
                            chartData={[65, 58, 62, 55, 48, 52, 45, 50, 42, 38]}
                        />
                        <Card
                            title="Overall Responder Earnings"
                            dateRange="2 Jul - Today"
                            value="$2,000"
                            percentage="10%"
                            trend="up"
                            trendValue="+$355 today"
                            chartColor="#009499"
                            iconColor="#14B8A6"
                            iconType="card"
                            chartData={[50, 52, 48, 51, 49, 53, 50, 52, 51, 50]}
                        />
                    </div>

                    {/* Recent Transactions Section */}
                    <Table type="transactions" data={transactions} totalItems={100} itemsPerPage={5} />

                    {/* Responder Withdrawals Section */}
                    <Table type="withdrawals" data={withdrawals} totalItems={100} itemsPerPage={5} />
                </>
            ) : (
                <Analytics />
            )}
        </div>
    );
}

