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

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error ${response.status}: ${data.detail || data}"}`);
      throw new Error("Failed to fetch nickname");
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error during nickname fetch:", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "An unknown error occurred",
      },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
