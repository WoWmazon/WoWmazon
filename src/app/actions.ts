"use server";

import { setCookie } from "@/utils/cookie";
import { createDeviceInfo } from "@/utils/deviceUtils";
import { LocaleTypes } from "@/utils/localization/settings";
import { createRegisterBody } from "@/utils/registerUtils";
import { isUndefined } from "@/utils/type-guard";
import { API_USER_REGISTER_URL } from "@/constants/api-urls";

export const registerUser = async (data: FormInput, locale: LocaleTypes) => {
  try {
    const deviceInfo = createDeviceInfo();
    const registerBody = createRegisterBody({
      ...data,
      lang: locale,
      deviceInfo,
    });

    const res = await fetch(API_USER_REGISTER_URL, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(registerBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to register: ${res.status} - ${res.statusText}`);
    }

    const { accessToken, refreshToken, error } = await res.json();

    if (isUndefined(error)) {
      setCookie("accessToken", accessToken, { httpOnly: true, secure: true });
      setCookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
      setCookie("device", JSON.stringify(deviceInfo), {
        httpOnly: true,
        secure: true,
      });
    } else {
      throw new Error(`Registration error: ${error}`);
    }
  } catch (e) {
    console.error("Error during user registration:", e);
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
