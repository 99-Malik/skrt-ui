"use client";

import React, { useEffect, useState } from "react";

interface PDFViewerProps {
    file: string | File | null;
    onLoadSuccess: (data: { numPages: number }) => void;
    numPages: number | null;
}

export default function PDFViewer({ file, onLoadSuccess, numPages }: PDFViewerProps) {
    const [PDFComponents, setPDFComponents] = useState<{
        Document: any;
        Page: any;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageWidth, setPageWidth] = useState(800);
    const [error, setError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file instanceof File) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof file === 'string') {
            setFileUrl(file);
        } else {
            setFileUrl(null);
        }
    }, [file]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Set page width based on container size - ensure whole page fits without cutting off
        const updateWidth = () => {
            // Modal is 70% of screen, preview section is ~50% of modal, minus padding (32px on each side = 64px total)
            const containerWidth = (window.innerWidth * 0.7 * 0.5) - 64;
            // Use 90% of available width to ensure nothing is cut off, with reasonable min/max bounds
            setPageWidth(Math.min(800, Math.max(400, containerWidth * 0.9)));
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);

        import('react-pdf').then((mod) => {
            // Set up PDF.js worker - use jsdelivr CDN which is more reliable
            const version = mod.pdfjs.version;
            mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

            setPDFComponents({
                Document: mod.Document,
                Page: mod.Page,
            });
            setIsLoading(false);
        }).catch((err) => {
            console.error('Failed to load react-pdf:', err);
            setIsLoading(false);
        });

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    if (!fileUrl) return null;

    if (isLoading || !PDFComponents) {
        return (
            <div className="w-full overflow-y-auto max-h-[calc(100vh-300px)] flex flex-col items-center justify-center p-8 bg-gray-50">
                <p className="text-sm text-[#6B7280]">Loading PDF viewer...</p>
            </div>
        );
    }

    const { Document, Page } = PDFComponents;

    return (
        <div className="w-full overflow-y-auto overflow-x-hidden max-h-[calc(100vh-300px)] bg-gray-50">
            <div className="flex flex-col items-center gap-4 p-4 w-full">
                <Document
                    file={fileUrl}
                    onLoadSuccess={(data: { numPages: number }) => {
                        setError(null);
                        onLoadSuccess(data);
                    }}
                    onLoadError={(error: Error) => {
                        console.error('PDF load error:', error);
                        setError(error.message || 'Failed to load PDF');
                    }}
                    loading={
                        <div className="flex items-center justify-center p-8">
                            <p className="text-sm text-[#6B7280]">Loading PDF...</p>
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center justify-center p-8">
                            <p className="text-sm text-red-500 mb-2">Failed to load PDF</p>
                            {error && <p className="text-xs text-[#6B7280]">{error}</p>}
                        </div>
                    }
                    className="flex flex-col items-center w-full"
                >
                    {numPages && Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_${index + 1}`} className="mb-4 bg-white shadow-sm rounded-lg overflow-hidden w-full flex justify-center">
                            <div className="w-full flex justify-center" style={{ maxWidth: `${pageWidth}px` }}>
                                <Page
                                    pageNumber={index + 1}
                                    width={pageWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="max-w-full h-auto"
                                />
                            </div>
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
}

