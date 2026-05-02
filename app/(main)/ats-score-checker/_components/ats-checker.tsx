'use client'
import { useEffect, useState } from 'react'

import { FileUploadCard, UploadedFile } from "@/components/ui/file-upload-card";
import { Button } from "@/components/ui/button";

// A mock file object for demonstration
const createMockFile = (name: string, size: number, type: string): File => {
    const blob = new Blob([""], { type });
    return new File([blob], name, { type });
};

// Initial files for the demo
const initialFiles: UploadedFile[] = [
    {
        id: "cv-pdf",
        file: createMockFile("my-cv.pdf", 120 * 1024, "application/pdf"),
        progress: 0,
        status: "uploading",
    },
    {
        id: "cert-pdf",
        file: createMockFile("google-certificate.pdf", 94 * 1024, "application/pdf"),
        progress: 100,
        status: "completed",
    },
];

const AtsChecker = () => {
    const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
    const [isVisible, setIsVisible] = useState(true);

    // Simulate upload progress for the "uploading" file
    useEffect(() => {
        const uploadingFile = files.find((f) => f.status === "uploading");
        if (!uploadingFile) return;

        const interval = setInterval(() => {
            setFiles((prevFiles) =>
                prevFiles.map((f) => {
                    if (f.id === uploadingFile.id) {
                        const newProgress = Math.min(f.progress + 10, 100);
                        return {
                            ...f,
                            progress: newProgress,
                            status: newProgress === 100 ? "completed" : "uploading",
                        };
                    }
                    return f;
                })
            );
        }, 300); // Update progress every 300ms

        return () => clearInterval(interval);
    }, [files]);

    // Handler for adding new files
    const handleFilesChange = (newFiles: File[]) => {
        const newUploadedFiles: UploadedFile[] = newFiles.map((file) => ({
            id: `${file.name}-${Date.now()}`,
            file,
            progress: 0,
            status: "uploading",
        }));
        setFiles((prev) => [...prev, ...newUploadedFiles]);
    };

    // Handler for removing a file
    const handleFileRemove = (id: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    };

    // Handler for closing the card
    const handleClose = () => {
        setIsVisible(false);
        // After animation, reset to show again for demo purposes
        setTimeout(() => {
            setIsVisible(true);
            setFiles(initialFiles);
        }, 500);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">ATS Score Checker</h1>
                <p className="text-sm text-muted-foreground mt-1">Upload your resume to check its ATS compatibility and get actionable feedback.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    {/* Upload Card */}
                    <div className="bg-background rounded-xl border shadow-sm flex flex-col">
                        {isVisible && (
                            <FileUploadCard
                                files={files}
                                onFilesChange={handleFilesChange}
                                onFileRemove={handleFileRemove}
                                onClose={handleClose}
                                className="border-none shadow-none w-full max-w-none"
                            />
                        )}
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-background rounded-xl border shadow-sm p-6">
                        <h3 className="font-semibold text-lg mb-6">Score Breakdown</h3>
                        <div className="space-y-5">
                            {[
                                { label: 'Formatting', score: 85 },
                                { label: 'Keywords', score: 80 },
                                { label: 'Skills Match', score: 75 },
                                { label: 'Experience', score: 90 },
                                { label: 'Education', score: 85 },
                            ].map(item => (
                                <div key={item.label} className="flex items-center gap-3">
                                    <span className="w-24 text-sm text-muted-foreground font-medium">{item.label}</span>
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.score}%` }} />
                                    </div>
                                    <span className="w-12 text-sm text-right text-muted-foreground font-medium">{item.score}/100</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6 lg:col-span-2">

                    {/* ATS Score */}
                    <div className="bg-background rounded-xl border shadow-sm p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative flex items-center justify-center w-48 h-48 shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <defs>
                                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    className="text-muted/30"
                                    strokeWidth="14"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="80"
                                    cx="96"
                                    cy="96"
                                />
                                <circle
                                    strokeWidth="14"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={(2 * Math.PI * 80) - (82 / 100) * (2 * Math.PI * 80)}
                                    strokeLinecap="round"
                                    stroke="url(#score-gradient)"
                                    fill="transparent"
                                    r="80"
                                    cx="96"
                                    cy="96"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold text-foreground">82</span>
                                <span className="text-sm font-medium text-muted-foreground mt-1">/ 100</span>
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold mb-2">Great Score! 🚀</h2>
                            <p className="text-muted-foreground">Your resume is well-optimized but can be improved further.</p>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-background rounded-xl border shadow-sm p-6 md:p-8 flex-1">
                        <h3 className="font-semibold text-lg mb-6">Suggestions</h3>
                        <ul className="space-y-4">
                            {[
                                "Add more relevant keywords from the job description.",
                                "Improve skills section with specific technologies.",
                                "Add quantified achievements in experience.",
                                "Ensure consistent formatting."
                            ].map((suggestion, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground shrink-0 mt-2" />
                                    <span className="text-muted-foreground">{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-md shadow-blue-500/20 rounded-lg">
                            View Detailed Report
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AtsChecker




