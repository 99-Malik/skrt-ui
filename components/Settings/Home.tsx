"use client";

import React, { useState } from "react";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [displayName, setDisplayName] = useState("Jackie Brad");
    const [username, setUsername] = useState("jackiebrad");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const EyeIcon = ({ visible }: { visible: boolean }) => (
        visible ? (
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
                <g clipPath="url(#clip0_eye)">
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
                    <clipPath id="clip0_eye">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        )
    );

    return (
        <div className="w-full space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1F2937]">Personal Information</h2>

                {/* Your Avatar */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center items-start">
                    <div className="shrink-0 lg:min-w-[180px] flex flex-col justify-center">
                        <h3 className="text-sm font-semibold text-[#1F2937] mb-2">Your Avatar</h3>
                        <p className="text-xs text-[#6B7280]">Choose your best picture that represent you</p>
                    </div>
                    <div className="shrink-0 flex items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                            <img
                                src={avatarPreview || "/images/user.png"}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div
                            onClick={() => document.getElementById('avatar-upload')?.click()}
                            className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-colors w-full"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4697 15.4697C11.7626 15.1768 12.2374 15.1768 12.5303 15.4697L14.5303 17.4697C14.8232 17.7626 14.8232 18.2374 14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303L12.75 17.8107V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V17.8107L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L11.4697 15.4697Z" fill="#010409" />
                                    <path d="M12.4762 3.75C9.7261 3.75 7.5119 5.95083 7.5119 8.64706C7.5119 9.10922 7.5766 9.55551 7.69729 9.97813C8.19449 10.1216 8.65991 10.3389 9.08045 10.6171C9.42592 10.8456 9.52072 11.3109 9.29219 11.6564C9.06366 12.0019 8.59835 12.0967 8.25288 11.8681C7.87207 11.6162 7.43917 11.4355 6.9733 11.3451C6.75147 11.3021 6.52165 11.2794 6.28571 11.2794C4.3246 11.2794 2.75 12.8482 2.75 14.7647C2.75 16.6812 4.3246 18.25 6.28571 18.25C6.69993 18.25 7.03571 18.5858 7.03571 19C7.03571 19.4142 6.69993 19.75 6.28571 19.75C3.51296 19.75 1.25 17.5264 1.25 14.7647C1.25 12.0605 3.41987 9.87207 6.11351 9.78228C6.04673 9.41355 6.0119 9.03413 6.0119 8.64706C6.0119 5.10572 8.91446 2.25 12.4762 2.25C15.6343 2.25 18.2724 4.49369 18.8314 7.47127C21.1313 8.44751 22.75 10.7093 22.75 13.3529C22.75 16.4269 20.5623 18.9843 17.6568 19.6057C17.2518 19.6923 16.8532 19.4341 16.7666 19.0291C16.68 18.624 16.9381 18.2254 17.3432 18.1388C19.5829 17.6598 21.25 15.693 21.25 13.3529C21.25 11.2162 19.8607 9.39087 17.9124 8.72463C17.4038 8.55072 16.8568 8.45588 16.2857 8.45588C15.7031 8.45588 15.1455 8.55458 14.6283 8.73526C14.2372 8.87185 13.8095 8.66557 13.6729 8.27453C13.5363 7.88348 13.7426 7.45575 14.1336 7.31916C14.8079 7.08364 15.5326 6.95588 16.2857 6.95588C16.5812 6.95588 16.8723 6.97555 17.1577 7.01367C16.477 5.11631 14.6422 3.75 12.4762 3.75Z" fill="#010409" />
                                </svg>

                                <div>
                                    <p className="text-sm font-medium text-[#1F2937] mb-1">Click to upload or drag and drop</p>
                                    <p className="text-xs text-[#6B7280]">SVG, PNG, JPG, or GIF (max 800x400px)</p>
                                </div>
                            </div>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Display Name */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/3 shrink-0">
                        <h3 className="text-sm font-semibold text-[#1F2937] mb-2">Display Name</h3>
                        <p className="text-xs text-[#6B7280]">This will be displayed on your profile</p>
                    </div>
                    <div className="md:flex-1">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/3 shrink-0">
                        <h3 className="text-sm font-semibold text-[#1F2937] mb-2">Username</h3>
                        <p className="text-xs text-[#6B7280]">Everyone can search your account with this</p>
                    </div>
                    <div className="md:flex-1">
                        <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                            <span className="px-4 py-3 bg-gray-50 text-sm text-[#6B7280] border-r border-gray-200">poptrade.com/</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1 px-4 py-3 text-sm text-[#1F2937] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Separator */}
            </div>

            {/* Security Settings Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-[#1F2937]">Security Settings</h2>

                {/* Change Password */}
                <div>
                    <h3 className="text-sm font-semibold text-[#1F2937] mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Enter your password */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.75 14.75C7.75 15.3023 7.30229 15.75 6.75 15.75C6.19772 15.75 5.75 15.3023 5.75 14.75C5.75 14.1977 6.19772 13.75 6.75 13.75C7.30229 13.75 7.75 14.1977 7.75 14.75Z" fill="#80868B" />
                                    <path d="M11.75 14.75C11.75 15.3023 11.3023 15.75 10.75 15.75C10.1977 15.75 9.75 15.3023 9.75 14.75C9.75 14.1977 10.1977 13.75 10.75 13.75C11.3023 13.75 11.75 14.1977 11.75 14.75Z" fill="#80868B" />
                                    <path d="M14.75 15.75C15.3023 15.75 15.75 15.3023 15.75 14.75C15.75 14.1977 15.3023 13.75 14.75 13.75C14.1977 13.75 13.75 14.1977 13.75 14.75C13.75 15.3023 14.1977 15.75 14.75 15.75Z" fill="#80868B" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.75V8.05277C3.77317 8.06872 3.55938 8.08948 3.35825 8.11652C2.45814 8.23754 1.70027 8.49643 1.09835 9.09835C0.496434 9.70027 0.237541 10.4581 0.116524 11.3582C-3.5964e-05 12.2252 -1.96761e-05 13.3275 5.3002e-07 14.6951V14.8049C-1.96761e-05 16.1725 -3.5964e-05 17.2748 0.116524 18.1418C0.237541 19.0419 0.496434 19.7997 1.09835 20.4016C1.70027 21.0036 2.45814 21.2625 3.35825 21.3835C4.22522 21.5 5.32754 21.5 6.69513 21.5H14.8049C16.1725 21.5 17.2748 21.5 18.1418 21.3835C19.0419 21.2625 19.7997 21.0036 20.4017 20.4016C21.0036 19.7997 21.2625 19.0419 21.3835 18.1418C21.5 17.2748 21.5 16.1725 21.5 14.8049V14.6951C21.5 13.3275 21.5 12.2252 21.3835 11.3582C21.2625 10.4581 21.0036 9.70027 20.4017 9.09835C19.7997 8.49643 19.0419 8.23754 18.1418 8.11652C17.9406 8.08948 17.7268 8.06872 17.5 8.05277V6.75C17.5 3.02208 14.4779 0 10.75 0C7.02208 0 4 3.02208 4 6.75ZM10.75 1.5C7.85051 1.5 5.5 3.85051 5.5 6.75V8.00344C5.87349 7.99999 6.27152 7.99999 6.69499 8H14.8049C15.2283 7.99999 15.6265 7.99999 16 8.00344V6.75C16 3.85051 13.6495 1.5 10.75 1.5ZM3.55812 9.60315C2.82435 9.7018 2.43577 9.88225 2.15901 10.159C1.88225 10.4358 1.7018 10.8243 1.60315 11.5581C1.50159 12.3135 1.5 13.3146 1.5 14.75C1.5 16.1854 1.50159 17.1865 1.60315 17.9419C1.7018 18.6757 1.88225 19.0642 2.15901 19.341C2.43577 19.6178 2.82435 19.7982 3.55812 19.8969C4.31347 19.9984 5.31459 20 6.75 20H14.75C16.1854 20 17.1865 19.9984 17.9419 19.8969C18.6757 19.7982 19.0642 19.6178 19.341 19.341C19.6178 19.0642 19.7982 18.6757 19.8969 17.9419C19.9984 17.1865 20 16.1854 20 14.75C20 13.3146 19.9984 12.3135 19.8969 11.5581C19.7982 10.8243 19.6178 10.4358 19.341 10.159C19.0642 9.88225 18.6757 9.7018 17.9419 9.60315C17.1865 9.50159 16.1854 9.5 14.75 9.5H6.75C5.31459 9.5 4.31347 9.50159 3.55812 9.60315Z" fill="#80868B" />
                                </svg>


                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-3 rounded-lg border bg-gray-50 border-gray-200 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent placeholder:text-[#9CA3AF]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <EyeIcon visible={showPassword} />
                            </button>
                        </div>

                        {/* Confirm New Password */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.75 14.75C7.75 15.3023 7.30229 15.75 6.75 15.75C6.19772 15.75 5.75 15.3023 5.75 14.75C5.75 14.1977 6.19772 13.75 6.75 13.75C7.30229 13.75 7.75 14.1977 7.75 14.75Z" fill="#80868B" />
                                    <path d="M11.75 14.75C11.75 15.3023 11.3023 15.75 10.75 15.75C10.1977 15.75 9.75 15.3023 9.75 14.75C9.75 14.1977 10.1977 13.75 10.75 13.75C11.3023 13.75 11.75 14.1977 11.75 14.75Z" fill="#80868B" />
                                    <path d="M14.75 15.75C15.3023 15.75 15.75 15.3023 15.75 14.75C15.75 14.1977 15.3023 13.75 14.75 13.75C14.1977 13.75 13.75 14.1977 13.75 14.75C13.75 15.3023 14.1977 15.75 14.75 15.75Z" fill="#80868B" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.75V8.05277C3.77317 8.06872 3.55938 8.08948 3.35825 8.11652C2.45814 8.23754 1.70027 8.49643 1.09835 9.09835C0.496434 9.70027 0.237541 10.4581 0.116524 11.3582C-3.5964e-05 12.2252 -1.96761e-05 13.3275 5.3002e-07 14.6951V14.8049C-1.96761e-05 16.1725 -3.5964e-05 17.2748 0.116524 18.1418C0.237541 19.0419 0.496434 19.7997 1.09835 20.4016C1.70027 21.0036 2.45814 21.2625 3.35825 21.3835C4.22522 21.5 5.32754 21.5 6.69513 21.5H14.8049C16.1725 21.5 17.2748 21.5 18.1418 21.3835C19.0419 21.2625 19.7997 21.0036 20.4017 20.4016C21.0036 19.7997 21.2625 19.0419 21.3835 18.1418C21.5 17.2748 21.5 16.1725 21.5 14.8049V14.6951C21.5 13.3275 21.5 12.2252 21.3835 11.3582C21.2625 10.4581 21.0036 9.70027 20.4017 9.09835C19.7997 8.49643 19.0419 8.23754 18.1418 8.11652C17.9406 8.08948 17.7268 8.06872 17.5 8.05277V6.75C17.5 3.02208 14.4779 0 10.75 0C7.02208 0 4 3.02208 4 6.75ZM10.75 1.5C7.85051 1.5 5.5 3.85051 5.5 6.75V8.00344C5.87349 7.99999 6.27152 7.99999 6.69499 8H14.8049C15.2283 7.99999 15.6265 7.99999 16 8.00344V6.75C16 3.85051 13.6495 1.5 10.75 1.5ZM3.55812 9.60315C2.82435 9.7018 2.43577 9.88225 2.15901 10.159C1.88225 10.4358 1.7018 10.8243 1.60315 11.5581C1.50159 12.3135 1.5 13.3146 1.5 14.75C1.5 16.1854 1.50159 17.1865 1.60315 17.9419C1.7018 18.6757 1.88225 19.0642 2.15901 19.341C2.43577 19.6178 2.82435 19.7982 3.55812 19.8969C4.31347 19.9984 5.31459 20 6.75 20H14.75C16.1854 20 17.1865 19.9984 17.9419 19.8969C18.6757 19.7982 19.0642 19.6178 19.341 19.341C19.6178 19.0642 19.7982 18.6757 19.8969 17.9419C19.9984 17.1865 20 16.1854 20 14.75C20 13.3146 19.9984 12.3135 19.8969 11.5581C19.7982 10.8243 19.6178 10.4358 19.341 10.159C19.0642 9.88225 18.6757 9.7018 17.9419 9.60315C17.1865 9.50159 16.1854 9.5 14.75 9.5H6.75C5.31459 9.5 4.31347 9.50159 3.55812 9.60315Z" fill="#80868B" />
                                </svg>

                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#25C889] focus:border-transparent placeholder:text-[#9CA3AF]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <EyeIcon visible={showConfirmPassword} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-start pt-6">
                <button className="px-8 py-3 bg-[#25C889] text-white rounded-lg font-semibold text-sm hover:bg-[#20B578] transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

