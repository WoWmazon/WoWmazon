"use server";

import { cookies } from "next/headers";
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchWithTokenReturnResponse,
} from "../fetchApi";

export const getNicknameValidate = async (nickname: string) => {
  try {
    const response = await fetchWithoutToken(
      "user/validate/",
      {
        cache: "no-store",
      },
      { nickname }
    );

    const { ok, status } = response;
    const data = await response.json();

    if (!ok && !(status === 400)) {
      console.error(`Error ${status}: ${data.detail || data}`);
      throw new Error(`Validation failed with status: ${status}`);
    }

    return {
      isValidated: data.nickname === "available nickname",
      error: status === 400 ? data.nickname : data.detail,
    };
  } catch (e) {
    return {
      isValidated: false,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const getRandomNickname = async () => {
  try {
    const response = await fetchWithoutToken("user/nickname/", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch nickname: ${response.status} ${response.statusText}`
      );
    }

    const { nickname } = await response.json();

    return nickname;
  } catch (e) {
    console.error(e);
    return "";
  }
};

export const postRefreshUser = async (refreshToken: string) => {
  try {
    const response = await fetchWithoutToken("user/refresh/", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to refresh user: ${response.status} ${response.statusText}`
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await response.json();

    return { accessToken, refreshToken: newRefreshToken };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const postLogin = async (device: string, refreshToken: string) => {
  try {
    const response = await fetchWithoutToken("user/login/", {
      method: "POST",
      body: JSON.stringify({ device, refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to login: ${response.status} ${response.statusText}`
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await response.json();

    return { accessToken, refreshToken: newRefreshToken };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const getUserInfo = async (id: string) => {
  return await fetchWithToken<UserInfoType>(`user/${id}/`);
};

export const patchUserNickname = async (info: {
  nickname?: string;
  lang?: string;
}) => {
  return await fetchWithToken<UserInfoType>("user/me/", {
    method: "PATCH",
    body: JSON.stringify(info),
  });
};

export const postUserWithdrawal = async (id: string) => {
  try {
    const response = await fetchWithTokenReturnResponse(
      `user/${id}/withdrawal/`,
      {
        method: "POST",
        body: JSON.stringify({ reason: "resaon" }),
      }
    );
    if (response.ok) {
      const cookieStore = cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("device");
    } else {
      throw new Error("Withdrawal Failed");
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error occurred");
  }
};
