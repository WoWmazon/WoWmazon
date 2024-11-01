"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import NicknameFields from "./nickname-fields";
import CheckFields from "./check-fields";
import CustomButton from "@/components/common/custom-button";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";
import { postRegisterUser } from "@/app/actions";
import CloseButtonIcon from "@/assets/icons/closeButton.svg";
import { useModalStore } from "@/stores/common";
import Modal from "@/components/common/modal";

const SignUpContainer = ({ defaultNickname }: { defaultNickname: string }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "user");
  const router = useRouter();
  const { handleModal } = useModalStore();
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);

  const formMethods = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      nickname: defaultNickname,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  // submit 가능 유무
  const canSubmit = isAvailableNickname && isValid;

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!isAvailableNickname) return;
    await postRegisterUser(data, locale);
    router.push("/");
  };

  const handleCloseModal = () => {
    handleModal({
      isShow: true,
      handleClose: () => handleModal({ isShow: false }),
      title: t("modal.title"),
      content: t("modal.content"),
      btnText: t("modal.button1"),
      handleAction: () => {
        handleModal({ isShow: false });
      },
      optionalBtnText: t("modal.button2"),
      handleOptional: () => {
        router.push("/");
        handleModal({ isShow: false });
      },
    });
  };

  return (
    <div className="h-full pt-5">
      <div
        className="flex mb-6 ml-auto w-4 h-4 content-center justify-center cursor-pointer"
        onClick={handleCloseModal}
      >
        <Image
          src={CloseButtonIcon}
          alt="signup-close"
          width={16}
          height={16}
        />
      </div>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-[calc(100%-3rem)] leading-7 text-ELSE-29"
        >
          <NicknameFields
            isAvailableNickname={isAvailableNickname}
            setIsAvailableNickname={setIsAvailableNickname}
          />
          <CheckFields />
          <div className="w-full py-5 mt-auto">
            <CustomButton
              variant={canSubmit ? "filled" : "disabled"}
              disabled={!canSubmit}
            >
              {t("sign-up.complete")}
            </CustomButton>
          </div>
        </form>
      </FormProvider>
      <Modal />
    </div>
  );
};

export default SignUpContainer;
