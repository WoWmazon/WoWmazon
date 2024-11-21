import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";
import CustomButton from "@/components/common/custom-button";
import CustomInput from "@/components/common/custom-input";
import { LocaleTypes } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import { nicknameRegex } from "@/constants/user";
import { handleDoubleCheckNickname } from "./handlers";

const NicknameFields = ({
  isAvailableNickname,
  setIsAvailableNickname,
  hasLabel = true,
}: NicknameFieldProps) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "user");

  const [validation, setValidation] = useState<NicknameValidationType>({
    message: "",
    isError: false,
  });

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { onChange, ...nicknameRest } = register("nickname", {
    required: true,
    pattern: nicknameRegex,
  });

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (!errors.nickname) {
      setIsAvailableNickname(false);
    }
  };

  useEffect(() => {
    if (!errors.nickname) {
      setValidation({ message: "", isError: false });
      return;
    }
    // nickname 에러일 시.
    setValidation({
      message: t("sign-up.validate1"),
      isError: true,
    });
  }, [errors.nickname, t]);

  return (
    <div className="flex flex-col gap-[6px]">
      {hasLabel && (
        <p className="font-bold">
          {t("sign-up.nickname")}
          <span className="text-SYSTEM-main">*</span>
        </p>
      )}
      <div className="grid grid-cols-[auto_auto] gap-2">
        <CustomInput
          className={twMerge(
            "bg-SYSTEM-white border-ELSE-D9 border h-14",
            validation.isError && "border-SYSTEM-main"
          )}
          placeholder="닉네임을 입력해주세요"
          variant="outline"
          size="large"
          hasDelBtn
          onChange={handleChangeNickname}
          {...nicknameRest}
        />
        <CustomButton
          className="px-[15px]"
          variant={
            validation.isError || isAvailableNickname
              ? "disabled"
              : "outlineColor"
          }
          onClick={() =>
            handleDoubleCheckNickname({
              nickname: getValues("nickname"),
              setValidation,
              setIsAvailableNickname,
              t,
            })
          }
          disabled={validation.isError || isAvailableNickname}
        >
          {t("sign-up.double-check")}
        </CustomButton>
      </div>
      <div
        className={twMerge(
          "text-sm text-SYSTEM-main leading-[18px]",
          !validation.isError && "text-ELSE-48"
        )}
      >
        {validation.message}
      </div>
    </div>
  );
};

export default NicknameFields;
