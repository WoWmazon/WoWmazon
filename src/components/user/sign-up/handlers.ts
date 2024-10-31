import { getNicknameValidate } from "@/api/user/apis";
import { nicknameRegex } from "@/constants/user";

export const handleDoubleCheckNickname = async ({
  nickname,
  setValidation,
  setIsAvailableNickname,
  t,
}: HandleDoubleCheckNicknameProps) => {
  if (!nicknameRegex.test(nickname)) {
    setValidation({
      message: t("sign-up.validate1"),
      isError: true,
    });
    return;
  }

  try {
    const { isValidated, error } = await getNicknameValidate(nickname);

    if (error || !isValidated) {
      throw new Error(error || t("sign-up.validate2"));
    }

    setValidation({
      message: t("sign-up.info"),
      isError: false,
    });

    setIsAvailableNickname(true);
  } catch (e) {
    setValidation({
      message: t(e instanceof Error ? e.message : "error"),
      isError: true,
    });
    setIsAvailableNickname(false);
  }
};
