"use server";

import { setCookie } from "@/utils/cookie";
import { createDeviceInfo } from "@/utils/deviceUtils";
import { LocaleTypes } from "@/utils/localization/settings";
import { createRegisterBody } from "@/utils/registerUtils";
import { isUndefined } from "@/utils/type-guard";
import { NITO_USER_REGISTER_URL } from "@/constants/nito-urls";

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

    const resonse = await fetch(NITO_USER_REGISTER_URL, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(registerBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resonse.ok) {
      throw new Error(
        `Failed to register: ${resonse.status} - ${resonse.statusText}`
      );
    }

    const { accessToken, refreshToken, error } = await resonse.json();

    if (isUndefined(error)) {
      const maxAge = 60 * 60 * 24 * 365; // 1 year in seconds
      const setCookieOptions = {
        secure: true,
        maxAge,
      };

      setCookie("accessToken", accessToken, setCookieOptions);
      setCookie("refreshToken", refreshToken, setCookieOptions);
      setCookie("device", JSON.stringify(deviceInfo), setCookieOptions);
    } else {
      throw new Error(`Registration error: ${error}`);
    }
  } catch (e) {
    console.error("Error during user registration:", e);
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
