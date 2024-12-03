"use server";

import { createDeviceInfo } from "@/utils/device-utils";
import { LocaleTypes } from "@/utils/localization/settings";
import { createRegisterBody } from "@/utils/register-utils";
import { fetchWithoutToken } from "@/api/fetchApi";
import { setCookieServer } from "@/utils/set-cookie";

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
    setCookieServer("accessToken", accessToken, setCookieOptions);
    setCookieServer("refreshToken", refreshToken, setCookieOptions);
    setCookieServer("device", JSON.stringify(deviceInfo), setCookieOptions);
  } catch (e) {
    console.error("Error during user registration:", e);
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
