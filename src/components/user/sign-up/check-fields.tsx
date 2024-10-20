import { useParams } from "next/navigation";
import { UseFormRegister } from "react-hook-form";
import CustomCheckBox from "@/components/common/custom-checkbox";
import CheckItem from "./check-item";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";

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
  const { locale } = useParams();
  const { t } = useTranslation(locale as LocaleTypes, "user");

  const checkList = [
    {
      required: true,
      name: "checkAge",
      description: t("sign-up.check1.description"),
    },
    {
      required: true,
      name: "checkService",
      description: t("sign-up.check2.description"),
      link: "",
      children: t("sign-up.check2.sub-description"),
    },
    {
      required: false,
      name: "checkMarketing",
      description: t("sign-up.check3.description"),
      link: "",
    },
  ];

  return (
    <div className="flex flex-col mt-6 gap-5">
      <div className="h-14 px-4 py-[14px] content-center border border-ELSE-D9 rounded-sm">
        <CustomCheckBox checked={isCheckAll} onChange={onChangeCheckAll}>
          <span className="text-ELSE-29 font-bold">
            {t("sign-up.all-check")}
          </span>
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
