import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get("nickname");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NITO_URL}/user/validate/?nickname=${nickname}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
}
