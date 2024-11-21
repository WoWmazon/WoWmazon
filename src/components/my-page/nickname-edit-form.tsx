import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import NicknameFields from "../user/sign-up/nickname-fields";
import { useState } from "react";

const NicknameEditForm = ({ nickname }: { nickname: string }) => {
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);

  const formMethods = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      nickname: nickname,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!isAvailableNickname) return;
    console.log(data.nickname);
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
        </form>
      </FormProvider>
    </div>
  );
};
export default NicknameEditForm;
