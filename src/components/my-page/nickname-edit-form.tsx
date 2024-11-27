import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import NicknameFields from "../user/sign-up/nickname-fields";
import CustomButton from "../common/custom-button";
import { useMutationUserInfo } from "@/hooks/useUserQuery";

const NicknameEditForm = ({
  nickname,
  onClose,
}: {
  nickname: string;
  onClose: () => void;
}) => {
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);
  const { mutate } = useMutationUserInfo();
  const formMethods = useForm<EditNicknameFormType>({
    mode: "onChange",
    defaultValues: {
      nickname: nickname,
    },
  });

  const { getValues, handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<EditNicknameFormType> = async (data) => {
    if (!isAvailableNickname) return;
    if (getValues("nickname") === nickname) {
      alert("변경 내용이 없습니다.");
      onClose();
      return;
    }
    mutate({ nickname: data.nickname });
    setIsAvailableNickname(false);
    onClose();
  };

  return (
    <div className="text-left">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NicknameFields
            isAvailableNickname={isAvailableNickname}
            setIsAvailableNickname={setIsAvailableNickname}
            hasLabel={false}
          />
          <CustomButton
            className="mt-5"
            variant={isAvailableNickname ? "filled" : "disabled"}
            type="submit"
          >
            완료
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};
export default NicknameEditForm;
