"use client";

import React from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../NavBar/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Navbar */}
                <Navbar title={title} />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
