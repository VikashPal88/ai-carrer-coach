"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-are";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileClock,
    FileUser,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    MessageSquareText,
    MessagesSquare,
    Settings,
    UserCircle,
    UserSearch,
    ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./separator";
import { Avatar, AvatarFallback } from "../ui/avator";

const SIDEBAR_LINKS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "DSA Sheet", href: "/dsa-sheet", icon: FileUser },
    { label: "Roadmaps", href: "/roadmaps", icon: MessagesSquare },
    { type: "separator" },
    { label: "Job Tracker", href: "/job-tracker", icon: FileUser },
    { label: "ATS Score Checker", href: "/ats-score-checker", icon: UserCircle },
    { label: "Jobs & Internship", href: "/jobs-and-internship", icon: UserSearch },
    { type: "separator" },
    { label: "AI Interview Practice", href: "/ai-interview-practice", icon: GraduationCap },
    { label: "Resume Builder", href: "/resume", icon: MessageSquareText },
    { label: "AI Cover Letter", href: "/ai-cover-letter", icon: MessageSquareText },
    { label: "Industry Insights", href: "/industry-insights", icon: FileClock },
];

const sidebarVariants = {
    open: { width: "16rem" }, // Slightly wider to fit the text nicely
    closed: { width: "4rem" },
};

const textVariants = {
    open: { opacity: 1, x: 0, transition: { delay: 0.1 } },
    closed: { opacity: 0, x: -10 },
};

export function SessionNavBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    return (
        <motion.div
            className="sidebar sticky top-0 z-40 h-screen shrink-0 border-r bg-background"
            initial={isCollapsed ? "closed" : "open"}
            animate={isCollapsed ? "closed" : "open"}
            variants={sidebarVariants}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <div className="flex h-full flex-col bg-white dark:bg-black transition-all">

                {/* TOP SECTION: Fixed Logo & Title */}
                <div className="flex h-10 items-center px-4 overflow-hidden border-muted/20 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3 border-b-2 w-full">
                        {/* Logo - Fixed on the left */}
                        <img
                            src="logo design.png"
                            alt="CareerPush Logo"
                            className="h-9 w-9 shrink-0 object-contain"
                        />

                        {/* Text Group - Slides in when expanded */}
                        {!isCollapsed && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                variants={textVariants}
                                className="flex flex-col justify-center"
                            >
                                <h1 className="text-lg font-bold tracking-tight text-primary leading-none text-[#045CB5]">
                                    Career<span className="text-[#F36105]">Push</span>
                                </h1>
                                {/* <div className="mt-1 flex flex-col">
                                    <p className="text-[8px] font-bold text-muted-foreground/70 uppercase tracking-[0.15em] leading-tight">
                                        AI Career Coach
                                    </p>
                                    <p className="text-[8px] font-bold text-blue-500/80 uppercase tracking-[0.15em] leading-tight">
                                        for your success
                                    </p>
                                </div> */}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* MIDDLE SECTION: Navigation Links */}
                <ScrollArea className="flex-1 px-3">
                    <div className="flex flex-col gap-1 py-1">
                        {SIDEBAR_LINKS.map((item, index) => {
                            // if (item.type === "separator") {
                            //     return <Separator key={`sep-${index}`} className="my-2 opacity-50" />;
                            // }
                            if (!item.href) return null;

                            const Icon = item.icon!;
                            const isActive = pathname?.includes(item.href!);

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "group flex h-10 items-center rounded-lg px-3 transition-all hover:bg-muted",
                                        isActive ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-blue-600")} />
                                    {!isCollapsed && (
                                        <motion.span
                                            variants={textVariants}
                                            className="ml-3 text-sm font-medium whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </ScrollArea>

                {/* BOTTOM SECTION: Settings, Account & Branding */}
                <div className="mt-auto flex flex-col p-3 gap-2 border-t border-muted/50">
                    <Link
                        href="/settings/integrations"
                        className="flex h-10 items-center rounded-lg px-3 text-muted-foreground hover:bg-muted hover:text-primary transition-all"
                    >
                        <Settings className="h-5 w-5 shrink-0" />
                        {!isCollapsed && (
                            <motion.span variants={textVariants} className="ml-3 text-sm font-medium">
                                Settings
                            </motion.span>
                        )}
                    </Link>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex h-10 items-center gap-3 rounded-lg px-2 hover:bg-muted transition-all cursor-pointer">
                                <Avatar className="size-6 shrink-0">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-[10px] font-bold">AL</AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                    <motion.div variants={textVariants} className="flex flex-1 items-center justify-between overflow-hidden">
                                        <span className="text-sm font-medium truncate">Account</span>
                                        <ChevronsUpDown className="h-3 w-3 opacity-50" />
                                    </motion.div>
                                )}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="end" sideOffset={12} className="w-48">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <UserCircle className="h-4 w-4" /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
                                <LogOut className="h-4 w-4" /> Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* NEW BRANDING TEXT */}
                    {/* {!isCollapsed && (
                        <motion.div
                            variants={textVariants}
                            className="mt-2 px-2"
                        >
                            <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest leading-tight">
                                AI Career Coach
                                <br />
                                <span className="text-blue-500/70">for your success</span>
                            </p>
                        </motion.div>
                    )} */}
                </div>
            </div>
        </motion.div>
    );
}