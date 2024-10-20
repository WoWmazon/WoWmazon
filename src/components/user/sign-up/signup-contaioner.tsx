"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import NicknameFields from "./nickname-fields";
import CheckFields from "./check-fields";
import CustomButton from "@/components/common/custom-button";

import CloseButtonIcon from "@/assets/icons/closeButton.svg";
import Modal from "@/components/common/modal";
import { useTranslation } from "@/utils/localization/client";
import { useParams, useRouter } from "next/navigation";
import { LocaleTypes } from "@/utils/localization/settings";

const inputMessageInit = {
  info: "",
  error: "",
};

const SignUpContainer = ({ defaultNickname }: { defaultNickname: string }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);
  const [inputMessage, setInputMessage] =
    useState<InputMessageType>(inputMessageInit);

  const { locale } = useParams();
  const { t } = useTranslation(locale as LocaleTypes, "user");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: {
      nickname: defaultNickname,
    },
  });

  // submit 가능 유무
  const canSubmit = () => isAvailableNickname && isValid;

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!isAvailableNickname) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/register`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ ...data, lang: locale }),
      }
    ).then((res) => res.json());
    console.log(res);
  };

  // 사용 가능한 닉네임인지 확인
  const handleCheckNickname = async (nickname: string) => {
    if (nickname === "" || errors.nickname) {
      return;
    }
    const { nickname: available, error } = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/validate/?nickname=${nickname}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());
    if (error) {
      setIsAvailableNickname(false);
      throw new Error(error);
    }
    if (available !== "available nickname") {
      setInputMessage((prev) => ({
        ...prev,
        error: t("sign-up.validate2"),
      }));
      setIsAvailableNickname(false);
      return;
    }
    setInputMessage({ info: t("sign-up.info"), error: "" });
    setIsAvailableNickname(true);
  };

  // nickname 체인지 이벤트
  const handleChangeNickname = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (isAvailableNickname) setIsAvailableNickname(false);
    if (!errors.nickname) {
      setInputMessage(inputMessageInit);
    }
    onChange(e);
  };

  // 전체동의 클릭 이벤트
  const handleChangeCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    // setValue 시 shouldValidate: true 옵션이 있어야 validate에도 적용된다.
    setValue("checkAge", checked, { shouldValidate: true });
    setValue("checkService", checked, { shouldValidate: true });
    setValue("checkMarketing", checked, { shouldValidate: true });
    setIsCheckAll(checked);
  };

  // 동의 체크 체인지 이벤트
  const handleChangeChecks = (e: ChangeEvent<HTMLInputElement>) => {
    const checkList = ["checkAge", "checkService", "checkMarketing"];

    if (!e.target.checked) {
      setIsCheckAll(false);
      return;
    }

    if (
      checkList.every(
        (check) =>
          check === e.target.name || getValues(check as keyof FormInput)
      ) &&
      e.target.checked
    ) {
      setIsCheckAll(true);
    }
  };

  useEffect(() => {
    if (!errors.nickname) {
      setInputMessage(inputMessageInit);
      return;
    }
    // nickname 에러일 시.
    if (errors.nickname) {
      setInputMessage({
        info: "",
        error: t("sign-up.validate1"),
      });
    }
  }, [errors.nickname]);

  return (
    <div className="h-full pt-4">
      {isModalOpen && (
        <Modal
          isShow={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          title={t("modal.title")}
          content={t("modal.content")}
          btnText={t("modal.button1")}
          handleAction={() => setIsModalOpen(false)}
          optionalBtnText={t("modal.button2")}
          handleOptional={() => router.push("/")}
        />
      )}
      <div
        className="flex mb-6 ml-auto w-6 h-6 content-center justify-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={CloseButtonIcon}
          alt="sign-up-close"
          width={16}
          height={16}
          priority
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-[calc(100%-3rem)] leading-7 text-ELSE-29"
      >
        <Controller
          control={control}
          name="nickname"
          rules={{
            required: true,
            pattern: /^(?=.*[A-Za-z])[A-Za-z0-9]{6,16}$/,
          }}
          render={({ field: { onChange, ...rest } }) => (
            <NicknameFields
              message={inputMessage}
              nicknameAvailable={isAvailableNickname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChangeNickname(e, onChange);
              }}
              onClickCheck={handleCheckNickname}
              {...rest}
            />
          )}
        />
        <CheckFields
          register={register}
          isCheckAll={isCheckAll}
          onChangeCheckAll={handleChangeCheckAll}
          onChangeChecks={handleChangeChecks}
        />
        <div className="w-full py-5 mt-auto">
          <CustomButton variant={canSubmit() ? "filled" : "disabled"}>
            {t("sign-up.complete")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
export default SignUpContainer;
