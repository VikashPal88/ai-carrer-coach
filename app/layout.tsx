import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/sidebar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description:
    "Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo design.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Navbar /> */}
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />


          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
