import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const coverLetters = await db.coverLetter.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coverLetters);
  } catch (error) {
    console.error("[COVER_LETTER_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { companyName, jobTitle, jobDescription } = await req.json();

    const prompt = `
      Write a professional cover letter for a ${jobTitle} position at ${companyName}.
      
      About the candidate:
      - Industry: ${user.industry}
      - Years of Experience: ${user.experience}
      - Skills: ${user.skills?.join(", ")}
      - Professional Background: ${user.bio}
      
      Job Description:
      ${jobDescription}
      
      Requirements:
      1. Use a professional, enthusiastic tone
      2. Highlight relevant skills and experience
      3. Show understanding of the company's needs
      4. Keep it concise (max 400 words)
      5. Use proper business letter formatting in markdown
      6. Include specific examples of achievements
      7. Relate candidate's background to job requirements
      
      Format the letter in markdown.
    `;

    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription,
        companyName,
        jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return NextResponse.json(coverLetter);
  } catch (error) {
    console.error("[COVER_LETTER_POST]", error);
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}
