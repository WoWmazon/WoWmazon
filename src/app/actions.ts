"use server";

import { setCookie } from "@/utils/cookie";
import { createDeviceInfo } from "@/utils/deviceUtils";
import { LocaleTypes } from "@/utils/localization/settings";
import { createRegisterBody } from "@/utils/registerUtils";
import { fetchWithoutToken } from "@/api/fetchApi";

export const postRegisterUser = async (
  data: FormInput,
  locale: LocaleTypes
) => {
  try {
    const deviceInfo = createDeviceInfo();
    const registerBody = createRegisterBody({
      ...data,
      lang: locale,
      deviceInfo,
    });

    const response = await fetchWithoutToken("user/register/", {
      method: "POST",
      body: JSON.stringify(registerBody),
      cache: "no-store",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Registration error: ${responseData}`);
    }

    const { accessToken, refreshToken } = responseData;

    const maxAge = 60 * 60 * 24 * 365; // 1 year in seconds
    const setCookieOptions = {
      secure: true,
      maxAge,
    };

    setCookie("accessToken", accessToken, setCookieOptions);
    setCookie("refreshToken", refreshToken, setCookieOptions);
    setCookie("device", JSON.stringify(deviceInfo), setCookieOptions);
  } catch (e) {
    console.error("Error during user registration:", e);
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
