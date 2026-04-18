import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <div className="container mx-auto mt-24 mb-20">{children}</div>;
}
