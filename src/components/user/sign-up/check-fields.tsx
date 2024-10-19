import CustomCheckBox from "@/components/common/custom-checkbox";
import CheckItem from "./check-item";
import { UseFormRegister } from "react-hook-form";

const checkList = [
  {
    required: true,
    name: "checkAge",
    content: " 만 14세 이상",
  },
  {
    required: true,
    name: "checkService",
    content: " 서비스 이용약관 동의",
    link: "",
    children: {
      content: "개인정보처리방침 [보기]",
    },
  },
  {
    required: false,
    name: "checkMarketing",
    content: " 마케팅 수신 동의",
    link: "",
  },
];

const CheckFields = ({
  register,
  isCheckAll,
  onChangeCheckAll,
  onChangeChecks,
}: {
  register: UseFormRegister<FormInput>;
  isCheckAll: boolean;
  onChangeCheckAll: React.ChangeEventHandler<HTMLInputElement>;
  onChangeChecks: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="flex flex-col mt-6 gap-5">
      <div className="h-14 px-4 py-[14px] content-center border border-ELSE-D9 rounded-sm">
        <CustomCheckBox checked={isCheckAll} onChange={onChangeCheckAll}>
          <span className="text-ELSE-29 font-bold">전체동의</span>
        </CustomCheckBox>
      </div>
      <div className="flex flex-col gap-3">
        {checkList.map((check, idx) => (
          <CheckItem
            key={`sign-check-${idx}`}
            register={register}
            {...check}
            onChange={onChangeChecks}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckFields;
