"use client";

import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import CheckItem from "./check-item";
import CustomCheckBox from "@/components/common/custom-checkbox";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";
import { checkFieldsItem, checkFields } from "@/constants/user";

const CheckFields = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "user");

  const [isCheckAll, setIsCheckAll] = useState(false);

  const { register, setValue, getValues } = useFormContext();

  // 전체동의 클릭 이벤트
  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    // setValue 시 shouldValidate: true 옵션이 있어야 validate에도 적용된다.
    checkFields.forEach((field) =>
      setValue(field, checked, { shouldValidate: true })
    );
    setIsCheckAll(checked);
  };

  // 동의 체크 체인지 이벤트
  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;

    if (!checked) {
      setIsCheckAll(false);
      return;
    }

    const isAllChecked = checkFields.every(
      (field) => field === name || getValues(field as keyof FormInput)
    );

    setIsCheckAll(isAllChecked && checked);
  };

  return (
    <div className="flex flex-col mt-6 gap-5">
      <div className="h-14 px-4 py-[14px] content-center border border-ELSE-D9 rounded-sm">
        <CustomCheckBox checked={isCheckAll} onChange={handleSelectAllChange}>
          <span className="text-ELSE-29 font-bold">
            {t("sign-up.all-check")}
          </span>
        </CustomCheckBox>
      </div>
      <div className="flex flex-col gap-3">
        {checkFieldsItem(t).map((check, idx) => (
          <CheckItem
            key={`sign-check-${idx}`}
            register={register}
            onChange={handleCheckChange}
            {...check}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckFields;
