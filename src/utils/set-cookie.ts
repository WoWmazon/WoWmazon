"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookieServer = (
  key: string,
  value: string,
  option?: Partial<ResponseCookie>
) => cookies().set(key, value, option);
