"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { signIn as authSignIn } from "@/auth";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return { success: true };
}

export async function signInWithCredentials(data: {
  email: string;
  password: string;
}) {
  try {
    await authSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch {
    throw new Error("Invalid email or password");
  }
}
