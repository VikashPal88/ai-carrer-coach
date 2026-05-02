import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { industryInsight: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { current, type } = await req.json();

    const prompt = `
      As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
      Make it more impactful, quantifiable, and aligned with industry standards.
      Current content: "${current}"

      Requirements:
      1. Use action verbs
      2. Include metrics and results where possible
      3. Highlight relevant technical skills
      4. Keep it concise but detailed
      5. Focus on achievements over responsibilities
      6. Use industry-specific keywords
      
      Format the response as a single paragraph without any additional text or explanations.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();

    return NextResponse.json({ content: improvedContent });
  } catch (error) {
    console.error("[RESUME_IMPROVE]", error);
    return NextResponse.json({ error: "Failed to improve content" }, { status: 500 });
  }
}
