"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import react-pdf with no SSR to avoid Node.js environment issues
const PDFViewer = dynamic(
    () => import('./PDFViewer').catch(() => ({ default: () => <div className="p-8 text-center text-[#6B7280]">PDF viewer loading...</div> })),
    {
        ssr: false,
        loading: () => <div className="p-8 text-center text-[#6B7280]">Loading PDF viewer...</div>
    }
);

interface UploadTaxFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UploadTaxForm({ isOpen, onClose }: UploadTaxFormProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            setUploadedFile(null);
            setFilePreview(null);
            setNumPages(null);
            setPageNumber(1);
        }
    }, [isOpen]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const handleFileSelect = (file: File) => {
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getFileExtension = (fileName: string): string => {
        const parts = fileName.split('.');
        if (parts.length > 1) {
            return parts[parts.length - 1].toUpperCase();
        }
        return 'FILE';
    };

    const getFileTypeBadge = (fileName: string): string => {
        const ext = getFileExtension(fileName);
        // Map common extensions to their display format
        const typeMap: { [key: string]: string } = {
            'PDF': 'PDF',
            'DOC': 'DOC',
            'DOCX': 'DOC',
            'PNG': 'PNG',
            'JPG': 'JPG',
            'JPEG': 'JPG',
            'GIF': 'GIF',
            'XLS': 'XLS',
            'XLSX': 'XLS',
            'TXT': 'TXT',
        };
        return typeMap[ext] || ext.substring(0, 3).toUpperCase();
    };

    const getFileTypeColor = (fileName: string): string => {
        const ext = getFileExtension(fileName);
        // Industry-standard file type colors
        const colorMap: { [key: string]: string } = {
            'PDF': '#DC2626',      // Red for PDF
            'DOC': '#2563EB',      // Blue for Word
            'DOCX': '#2563EB',     // Blue for Word
            'PNG': '#10B981',      // Green for images
            'JPG': '#10B981',      // Green for images
            'JPEG': '#10B981',     // Green for images
            'GIF': '#10B981',      // Green for images
            'XLS': '#059669',      // Dark green for Excel
            'XLSX': '#059669',     // Dark green for Excel
            'TXT': '#6B7280',      // Gray for text files
        };
        return colorMap[ext] || '#6B7280'; // Default gray
    };

    const isImageFile = (fileName: string): boolean => {
        const ext = getFileExtension(fileName);
        return ['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP', 'SVG'].includes(ext);
    };

    const renderFileIcon = (fileName: string) => {
        const fileType = getFileTypeBadge(fileName);
        const badgeColor = getFileTypeColor(fileName);
        const isImage = isImageFile(fileName);

        // Complete file icon with integrated badge - all in one SVG
        return (
            <svg className="w-full h-full" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Document background - light gray */}
                <path
                    d="M12 6C10.8954 6 10 6.89543 10 8V40C10 41.1046 10.8954 42 12 42H36C37.1046 42 38 41.1046 38 40V16L28 6H12Z"
                    fill="#F3F4F6"
                    stroke="#D1D5DB"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Folded corner */}
                <path d="M28 6V16H38" stroke="#D1D5DB" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />

                {/* Content lines - varying lengths */}
                {isImage ? (
                    <g opacity="0.6">
                        <rect x="15" y="20" width="18" height="14" rx="1" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
                        <circle cx="19" cy="24" r="1.5" fill="#9CA3AF" />
                        <path d="M15 30L19 26L23 30L27 24L31 28V34H15V30Z" fill="#9CA3AF" />
                    </g>
                ) : (
                    <g opacity="0.6">
                        <line x1="16" y1="20" x2="32" y2="20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="16" y1="25" x2="32" y2="25" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="16" y1="30" x2="26" y2="30" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                )}

                {/* File type badge - integrated at bottom with proper alignment */}
                <rect x="6" y="34" width="36" height="12" rx="3" fill={badgeColor} stroke="white" strokeWidth="2" />
                <text
                    x="24"
                    y="40"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="9"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="800"
                    letterSpacing="0.5px"
                    style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}
                >
                    {fileType}
                </text>
            </svg>
        );
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900/30 z-40 modal-backdrop"
                style={{
                    margin: 0,
                    padding: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-4 bottom-4 w-full md:w-[70%] right-4 left-4 md:left-auto bg-white z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-[#1F2937]">Upload Tax Form</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                    <g clipPath="url(#clip0_1632_19186)">
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                            {/* Left Section - Upload Area */}
                            <div className="flex flex-col">
                                <div
                                    ref={dropZoneRef}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className={`border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center transition-colors ${!uploadedFile ? 'hover:border-[#25C889] bg-white cursor-pointer' : 'bg-white'
                                        }`}
                                    onClick={(e) => {
                                        // Only trigger click if not clicking on the remove button or interactive elements
                                        if (!uploadedFile && fileInputRef.current) {
                                            fileInputRef.current.click();
                                        }
                                    }}
                                >
                                    {/* Top Section: Button & Text */}
                                    <div className="w-full flex flex-col items-center mb-6">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fileInputRef.current?.click();
                                            }}
                                            className="px-8 py-3 rounded-xl bg-[#25C889] text-white text-sm font-semibold hover:bg-[#20B578] transition-colors shadow-sm"
                                        >
                                            {uploadedFile ? 'Change File' : 'Choose File'}
                                        </button>

                                        <p className="text-[#6B7280] mt-6 text-sm">
                                            Drag and drop file here, or click add file
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    {uploadedFile && (
                                        <>
                                            <div className="w-full h-px bg-gray-100 mb-6"></div>

                                            {/* File Info Card */}
                                            <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 text-left">
                                                {/* File Icon */}
                                                <div className="relative w-10 h-12 shrink-0 flex items-center justify-center">
                                                    {renderFileIcon(uploadedFile.name)}
                                                </div>

                                                {/* File Details */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[#1F2937] font-semibold text-sm truncate mb-1">
                                                        {uploadedFile.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-[#6B7280]">{formatFileSize(uploadedFile.size)} -</span>
                                                        <span className="text-[#009499] font-medium flex items-center gap-1">
                                                            <div className="w-4 h-4 rounded-full bg-[#009499] flex items-center justify-center">
                                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="18" height="18" rx="9" fill="#009499" />
                                                                    <g clip-path="url(#clip0_2173_2151)">
                                                                        <path d="M13.2995 5.84625L7.54159 11.6038C7.50288 11.6426 7.45688 11.6735 7.40622 11.6945C7.35556 11.7155 7.30124 11.7264 7.24639 11.7264C7.19153 11.7264 7.13721 11.7155 7.08656 11.6945C7.0359 11.6735 6.98989 11.6426 6.95118 11.6038L4.72451 9.375C4.6858 9.33614 4.63979 9.3053 4.58913 9.28426C4.53848 9.26321 4.48416 9.25238 4.4293 9.25238C4.37445 9.25238 4.32013 9.26321 4.26947 9.28426C4.21881 9.3053 4.17281 9.33614 4.1341 9.375C4.09523 9.41372 4.06439 9.45972 4.04335 9.51038C4.02231 9.56104 4.01147 9.61536 4.01147 9.67021C4.01147 9.72507 4.02231 9.77938 4.04335 9.83004C4.06439 9.8807 4.09523 9.92671 4.1341 9.96542L6.3616 12.1925C6.59657 12.427 6.91501 12.5588 7.24701 12.5588C7.57901 12.5588 7.89745 12.427 8.13243 12.1925L13.8899 6.43625C13.9287 6.39755 13.9595 6.35157 13.9805 6.30095C14.0015 6.25033 14.0123 6.19606 14.0123 6.14125C14.0123 6.08645 14.0015 6.03218 13.9805 5.98156C13.9595 5.93094 13.9287 5.88496 13.8899 5.84625C13.8512 5.80739 13.8052 5.77655 13.7546 5.75551C13.7039 5.73446 13.6496 5.72363 13.5947 5.72363C13.5399 5.72363 13.4855 5.73446 13.4349 5.75551C13.3842 5.77655 13.3382 5.80739 13.2995 5.84625Z" fill="white" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2173_2151">
                                                                            <rect width="10" height="10" fill="white" transform="translate(4 4)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                            </div>
                                                            Uploaded
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveFile();
                                                    }}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                            </div>

                            {/* Right Section - Preview */}
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Preview</h3>
                                <div className="flex-1 rounded-lg overflow-hidden bg-transparent">
                                    {filePreview && uploadedFile ? (
                                        <div className="w-full h-full ">
                                            {uploadedFile.type.startsWith('image/') ? (
                                                <div className="w-full overflow-y-auto overflow-x-hidden max-h-[calc(100vh-300px)] bg-gray-50">
                                                    <div className="flex justify-center items-start p-4 w-full">
                                                        <img
                                                            src={filePreview || ''}
                                                            alt="Form Preview"
                                                            className="w-full max-w-full h-auto object-contain"
                                                            style={{
                                                                display: 'block',
                                                                minHeight: '400px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : uploadedFile.type === 'application/pdf' ? (
                                                <PDFViewer
                                                    file={uploadedFile}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                    numPages={numPages}
                                                />
                                            ) : (
                                                <div className="w-full h-full min-h-[500px] flex items-center justify-center">
                                                    <div className="text-center">
                                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 opacity-50">
                                                            <path d="M42 16H22C20.8954 16 20 16.8954 20 18V46C20 47.1046 20.8954 48 22 48H42C43.1046 48 44 47.1046 44 46V18C44 16.8954 43.1046 16 42 16Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M24 22H40M24 28H40M24 34H36" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <p className="text-sm text-[#6B7280]">{uploadedFile.name}</p>
                                                        <p className="text-xs text-[#9CA3AF] mt-1">Preview not available for this file type</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full min-h-[500px] flex items-center justify-center">
                                            <div className="text-center">
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 opacity-50">
                                                    <path d="M42 16H22C20.8954 16 20 16.8954 20 18V46C20 47.1046 20.8954 48 22 48H42C43.1046 48 44 47.1046 44 46V18C44 16.8954 43.1046 16 42 16Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M24 22H40M24 28H40M24 34H36" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="text-sm text-[#6B7280]">No preview available</p>
                                                <p className="text-xs text-[#9CA3AF] mt-1">Upload a file to see preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
