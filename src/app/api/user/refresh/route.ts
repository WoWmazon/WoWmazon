import { NextRequest, NextResponse } from "next/server";
import { NITO_USER_REFRESH_URL } from "@/constants/nito-urls";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(NITO_USER_REFRESH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error ${response.status}: ${data.detail || data}`);
      throw new Error(`Refresh failed with status: ${response.status}`);
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error during token refresh:", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}