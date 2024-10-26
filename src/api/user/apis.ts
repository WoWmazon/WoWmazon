"use server";

import {
  NITO_USER_LOGIN_URL,
  NITO_USER_NICKNAME_URL,
  NITO_USER_REFRESH_URL,
  NITO_USER_VALIDATE_URL,
} from "@/constants/nito-urls";

const fetchOptions: RequestInit = {
  cache: "no-store",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const getNicknameValidate = async (nickname: string) => {
  if (!nickname) {
    return {
      error: "Nickname is required",
    };
  }

  try {
    const response = await fetch(
      `${NITO_USER_VALIDATE_URL}?nickname=${nickname}`,
      fetchOptions
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
    const response = await fetch(NITO_USER_NICKNAME_URL, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch nickname: ${response.status} ${response.statusText}`
      );
    }

    const { nickname, error } = await response.json();

    if (error) {
      throw new Error(error);
    }

    return nickname;
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const postRefreshUser = async (refreshToken: string) => {
  try {
    const response = await fetch(NITO_USER_REFRESH_URL, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      ...fetchOptions,
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
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const postLogin = async (device: string, refreshToken: string) => {
  try {
    const response = await fetch(NITO_USER_LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ device, refreshToken }),
      ...fetchOptions,
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
