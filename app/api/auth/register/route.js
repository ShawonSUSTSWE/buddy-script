import { NextResponse } from "next/server";
import { authService } from "@/services/AuthService";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await authService.register(body);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
