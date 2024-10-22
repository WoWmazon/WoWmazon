import {
  API_USER_NICKNAME_URL,
  API_USER_REFRESH_URL,
  API_USER_VALIDATE_URL,
} from "@/constants/api-urls";

export const fetchNicknameValidate = async (nickname: string) => {
  try {
    const response = await fetch(
      `${API_USER_VALIDATE_URL}?nickname=${nickname}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to validate nickname: ${response.status} ${response.statusText}`
      );
    }

    const { nickname: available, error } = await response.json();

    return { isValidated: available === "available nickname", error: error };
  } catch (e) {
    return {
      isValidated: false,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

export const fetchRandomNickname = async () => {
  try {
    const response = await fetch(API_USER_NICKNAME_URL, {
      cache: "no-store",
    });

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

export const fetchRefreshUser = async (refreshToken: string) => {
  try {
    const response = await fetch(API_USER_REFRESH_URL, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ refreshToken }),
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

export const fetchLogin = async (device: string, refreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/login`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ device, refreshToken }),
      }
    );

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
