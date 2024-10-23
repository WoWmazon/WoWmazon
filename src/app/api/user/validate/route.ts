import { NextRequest, NextResponse } from "next/server";
import { NITO_USER_VALIDATE_URL } from "@/constants/nito-urls";

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
      `${NITO_USER_VALIDATE_URL}?nickname=${nickname}`,

      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    // status === 400일 때 data: [nickname: "이미 사용중인 닉네임이에요"] 보냄.
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
