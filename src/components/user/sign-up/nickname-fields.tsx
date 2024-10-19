import CustomButton from "@/components/common/custom-button";
import CustomInput from "@/components/common/custom-input";
import { twMerge } from "tailwind-merge";

const NicknameFields = (props) => {
  const { isError, ...rest } = props;

  return (
    <div className="flex flex-col gap-[6px]">
      <p className="font-bold">
        닉네임<span className="text-SYSTEM-main">*</span>
      </p>
      <div className="grid grid-cols-[auto_85px] gap-2">
        <CustomInput
          className={twMerge(
            "bg-SYSTEM-white border-ELSE-D9 border h-14",
            isError && "border-SYSTEM-main"
          )}
          placeholder="닉네임을 입력해주세요"
          hasDelBtn
          {...rest}
        />
        <CustomButton variant="disabled">중복확인</CustomButton>
      </div>
    </div>
  );
};
export default NicknameFields;
