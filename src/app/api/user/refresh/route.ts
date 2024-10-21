import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NITO_URL}/user/refresh/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      console.error(data);
      throw new Error("register error");
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
}
