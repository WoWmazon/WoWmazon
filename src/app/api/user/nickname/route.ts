import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NITO_URL}/user/nickname/`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("An error occurred");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
}
