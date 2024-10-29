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
import CloseModal from "./close-modal";
import { postRegisterUser } from "@/app/actions";

import CloseButtonIcon from "@/assets/icons/closeButton.svg";

const SignUpContainer = ({ defaultNickname }: { defaultNickname: string }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "user");
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="h-full pt-5">
      <CloseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div
        className="flex mb-6 ml-auto w-4 h-4 content-center justify-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
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
    </div>
  );
};

export default SignUpContainer;
