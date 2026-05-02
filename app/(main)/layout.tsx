import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionNavBar } from "@/components/sidebar/sidebar";
import Navbar from "@/components/sidebar/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex">

      <SessionNavBar />
      <main className="flex-1 w-full max-w-full">
        <Navbar />
        <div className="container mx-auto p-5 mb-20">{children}</div>
      </main>
    </div>
  );
}
