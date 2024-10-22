import { fetchNicknameValidate } from "@/api/user/apis";
import { nicknameRegex } from "@/constants/user";

export const handleDoubleCheckNickname = async ({
  nickname,
  setInputMessage,
  setIsAvailableNickname,
  t,
}: HandleDoubleCheckNicknameProps) => {
  if (!nicknameRegex.test(nickname)) {
    setInputMessage((prev: InputMessageType) => ({
      ...prev,
      error: t("sign-up.validate1"),
    }));
    return;
  }

  const { isValidated, error } = await fetchNicknameValidate(nickname);

  if (error) {
    setIsAvailableNickname(false);
    throw new Error(error);
  }

  if (!isValidated) {
    setInputMessage((prev: InputMessageType) => ({
      ...prev,
      error: t("sign-up.validate2"),
    }));
    setIsAvailableNickname(false);
    return;
  }

  setInputMessage({ info: t("sign-up.info"), error: "" });
  setIsAvailableNickname(true);
};
