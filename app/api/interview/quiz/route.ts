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
      select: { industry: true, skills: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prompt = `
      Generate 10 technical interview questions for a ${
        user.industry
      } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
      
      Each question should be multiple choice with 4 options.
      
      Return the response in this JSON format only, no additional text:
      {
        "questions": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string",
            "explanation": "string"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return NextResponse.json(quiz.questions);
  } catch (error) {
    console.error("[QUIZ_GENERATE]", error);
    return NextResponse.json({ error: "Failed to generate quiz questions" }, { status: 500 });
  }
}
