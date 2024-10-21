export const fetchNicknameValidate = async (nickname: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/validate/?nickname=${nickname}`,
    {
      cache: "no-store",
    }
  );

  const { nickname: available, error } = await res.json();

  return { isValidated: available === "available nickname", error: error };
};
