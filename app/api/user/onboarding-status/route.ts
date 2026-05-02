import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { industry: true },
    });

    return NextResponse.json({ isOnboarded: !!user?.industry });
  } catch (error) {
    console.error("[ONBOARDING_STATUS]", error);
    return NextResponse.json({ error: "Failed to check onboarding status" }, { status: 500 });
  }
}
