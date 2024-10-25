"use client";

import { ChangeEvent, useState } from "react";
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
  const { locale }: { locale: LocaleTypes } = useParams();
  const { t } = useTranslation(locale, "user");
  const router = useRouter();

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);

  const method = useForm<FormInput>({
    defaultValues: {
      nickname: defaultNickname,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = method;

  // submit 가능 유무
  const canSubmit = isAvailableNickname && isValid;

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!isAvailableNickname) return;
    await postRegisterUser(data, locale);
    router.push("/");
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
    const { checked, name } = e.target;

    if (!checked) {
      setIsCheckAll(false);
      return;
    }

    const AllCheck =
      checkList.every(
        (check) => check === name || getValues(check as keyof FormInput)
      ) && checked;

    if (AllCheck) setIsCheckAll(true);
  };

  return (
    <div className="h-full pt-5">
      <CloseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div
        className="flex mb-6 ml-auto w-4 h-4 content-center justify-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image src={CloseButtonIcon} alt="signup-close" width={16} />
      </div>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-[calc(100%-3rem)] leading-7 text-ELSE-29"
        >
          <NicknameFields
            isAvailableNickname={isAvailableNickname}
            setIsAvailableNickname={setIsAvailableNickname}
          />
          <CheckFields
            register={register}
            isCheckAll={isCheckAll}
            onChangeCheckAll={handleChangeCheckAll}
            onChangeChecks={handleChangeChecks}
          />
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
