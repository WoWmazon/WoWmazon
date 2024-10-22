import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get("nickname");
  // 닉네임이 없는 경우 에러 처리
  if (!nickname) {
    return NextResponse.json(
      {
        error: "Nickname is required",
      },
      { status: 400 }
    );
  }

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

    if (!response.ok && !(response.status === 400)) {
      console.error(`Error ${response.status}: ${data.detail || data}`);
      throw new Error(`Validation failed with status: ${response.status}`);
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error during validation:", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
