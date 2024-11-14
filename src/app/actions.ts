"use server";

import { setCookie } from "@/utils/cookie";
import { createDeviceInfo } from "@/utils/deviceUtils";
import { LocaleTypes } from "@/utils/localization/settings";
import { createRegisterBody } from "@/utils/registerUtils";
import { COOKIE_OPTIONS } from "@/constants/cookie";
import { fetchServer } from "@/utils/apis/fetch.server";

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

    const response = await fetchServer("user/register/", {
      method: "POST",
      body: JSON.stringify(registerBody),
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Registration error: ${response.status}-${response.statusText}`
      );
    }

    const responseData = await response.json();

    const { accessToken, refreshToken } = responseData;

    setCookie("accessToken", accessToken, COOKIE_OPTIONS);
    setCookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    setCookie("device", JSON.stringify(deviceInfo), COOKIE_OPTIONS);
  } catch (e) {
    console.error("Error during user registration:", e);
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
