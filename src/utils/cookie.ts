import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const setCookie = (
  key: string,
  value: string,
  option?: Partial<ResponseCookie>
) => cookies().set(key, value, option);

export const getCookie = (key: string) => cookies().get(key)?.value;

export const deleteCookie = (key: string) =>
  cookies().set(key, "", { maxAge: -1 });
