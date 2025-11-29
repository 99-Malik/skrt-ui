"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GreenBackgroundSvg from "../Svgs/BackGround";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans text-[#1A1A1A]">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <GreenBackgroundSvg />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/skrt-logo.png"
              alt="SKRT Logo"
              width={110}
              height={50}
              priority
              className="object-contain"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#1F2937] mb-2">
            Sign in/Log in
          </h2>
          <p className="text-[#6B7280] flex items-center justify-center gap-1">
            Welcome Back <span className="text-xl">👋</span>
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#1F2937]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent transition-all text-sm placeholder-gray-400 bg-white"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#1F2937]"
            >
              Enter your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="**********"
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent transition-all text-sm placeholder-gray-400 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_eye_slash)">
                      <path
                        d="M7.99989 10.6656C9.4721 10.6656 10.6656 9.47216 10.6656 7.99995C10.6656 6.52775 9.4721 5.33429 7.99989 5.33429C6.52769 5.33429 5.33423 6.52775 5.33423 7.99995C5.33423 9.47216 6.52769 10.6656 7.99989 10.6656Z"
                        fill="#727A90"
                      />
                      <path
                        d="M15.5112 6.28004C14.4776 4.59666 12.1265 1.77237 7.99998 1.77237C3.87352 1.77237 1.52239 4.59666 0.488772 6.28004C-0.162924 7.33412 -0.162924 8.666 0.488772 9.72011C1.52239 11.4035 3.87352 14.2278 7.99998 14.2278C12.1265 14.2278 14.4776 11.4035 15.5112 9.72011C16.1629 8.666 16.1629 7.33412 15.5112 6.28004ZM7.99998 11.9986C5.79168 11.9986 4.00147 10.2084 4.00147 8.00006C4.00147 5.79175 5.79168 4.00154 7.99998 4.00154C10.2083 4.00154 11.9985 5.79175 11.9985 8.00006C11.9963 10.2075 10.2074 11.9964 7.99998 11.9986Z"
                        fill="#727A90"
                      />
                      <line
                        x1="2"
                        y1="2"
                        x2="14"
                        y2="14"
                        stroke="#727A90"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_eye_slash">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2082_197)">
                      <path
                        d="M7.99989 10.6656C9.4721 10.6656 10.6656 9.47216 10.6656 7.99995C10.6656 6.52775 9.4721 5.33429 7.99989 5.33429C6.52769 5.33429 5.33423 6.52775 5.33423 7.99995C5.33423 9.47216 6.52769 10.6656 7.99989 10.6656Z"
                        fill="#727A90"
                      />
                      <path
                        d="M15.5112 6.28004C14.4776 4.59666 12.1265 1.77237 7.99998 1.77237C3.87352 1.77237 1.52239 4.59666 0.488772 6.28004C-0.162924 7.33412 -0.162924 8.666 0.488772 9.72011C1.52239 11.4035 3.87352 14.2278 7.99998 14.2278C12.1265 14.2278 14.4776 11.4035 15.5112 9.72011C16.1629 8.666 16.1629 7.33412 15.5112 6.28004ZM7.99998 11.9986C5.79168 11.9986 4.00147 10.2084 4.00147 8.00006C4.00147 5.79175 5.79168 4.00154 7.99998 4.00154C10.2083 4.00154 11.9985 5.79175 11.9985 8.00006C11.9963 10.2075 10.2074 11.9964 7.99998 11.9986Z"
                        fill="#727A90"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2082_197">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-start">
            <Link
              href="/sign-in/forgot-password"
              className="text-[#25C889] text-sm hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={() => router.push("/manage-users")}
            className="w-full bg-[#25C889] text-white font-bold py-3.5 rounded-lg hover:bg-[#1eb378] transition-colors shadow-sm"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center max-w-sm">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            By clicking on the "Create an Account" button, I consent to the
            processing of my personal data in accordance with the{" "}
            <span className="font-bold text-[#1F2937]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}