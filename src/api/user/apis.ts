export const fetchNicknameValidate = async (nickname: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/validate/?nickname=${nickname}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to validate nickname: ${res.status} ${res.statusText}`
      );
    }

    const { nickname: available, error } = await res.json();

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/nickname`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch nickname: ${res.status} ${res.statusText}`
      );
    }

    const { nickname, error } = await res.json();

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
