"use server";

import { setCookie } from "@/utils/cookie";
import { LocaleTypes } from "@/utils/localization/settings";
import { randomUUID } from "crypto";

export const registerUser = async (data: FormInput, locale: LocaleTypes) => {
  const osList: ("android" | "ios")[] = ["android", "ios"];

  const deviceInfo: DeviceType = {
    os: osList[Math.round(Math.random())],
    uid: "uid:" + randomUUID(),
    token: "token:" + randomUUID(),
  };

  const { nickname, checkAge, checkService, checkMarketing } = data;

  const registerBody = {
    lang: locale,
    isAlarm: true,
    nickname: nickname,
    agreement: {
      isOverAge14: checkAge,
      isServiceAccept: checkService,
      isInfoAccept: checkService,
      isMarketing: checkMarketing,
    },
    device: deviceInfo,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/register`,
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(registerBody),
    }
  );

  const { accessToken, refreshToken } = await res.json();

  setCookie("accessToken", accessToken, { httpOnly: true, secure: true });
  setCookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  setCookie("device", JSON.stringify(deviceInfo), {
    httpOnly: true,
    secure: true,
  });
};
