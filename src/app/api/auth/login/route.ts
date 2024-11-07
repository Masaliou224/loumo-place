import { generateToken, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input 
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("Request received:", { email, password });

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    console.log("User found:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    console.log("Password validation result:", isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken(user.id);
    console.log("Generated token:", token);

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  };
}