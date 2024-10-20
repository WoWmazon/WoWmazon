"use client";

import CustomCheckBox from "@/components/common/custom-checkbox";
import Image from "next/image";

import RightArrow from "@/assets/icons/right_arrow.svg";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";

const CheckItem = ({
  name,
  required,
  description,
  link,
  children,
  register,
  onChange,
}: CheckItemProps) => {
  const { onChange: registerOnChange, ...rest } = register(name, { required });
  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerOnChange(e);
    onChange(e);
  };
  const { locale } = useParams();
  const { t } = useTranslation(locale as LocaleTypes, "user");

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[auto_24px]">
        <CustomCheckBox {...rest} onChange={handleChangeCheck}>
          <span>
            {required ? (
              <strong className="text-SYSTEM-main">
                {t("sign-up.required")}
              </strong>
            ) : (
              <strong className="text-ELSE-F8">{t("sign-up.optional")}</strong>
            )}
            &nbsp;
            {description}
          </span>
        </CustomCheckBox>
        {link !== undefined && (
          <Image src={RightArrow} alt="right-arrow1" width={24} height={24} />
        )}
      </div>
      {children && (
        <div className="pl-7">
          <span className="text-ELSE-F8">{children}</span>
        </div>
      )}
    </div>
  );
};
export default CheckItem;
