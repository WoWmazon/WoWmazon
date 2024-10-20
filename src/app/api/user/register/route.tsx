import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { lang, nickname, checkAge, checkService, checkMarketing } =
      await request.json();
    const registerBody = {
      lang: lang,
      isAlarm: true,
      nickname: nickname,
      agreement: {
        isOverAge14: checkAge,
        isServiceAccept: checkService,
        isInfoAccept: checkService,
        isMarketing: checkMarketing,
      },
      device: {
        os: "android",
        uid: "string",
        token: "string",
      },
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NITO_URL}/user/register/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerBody),
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
