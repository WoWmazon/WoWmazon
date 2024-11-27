"use client";
import alram from "@/assets/icons/header_alarm.svg";
import activeAlram from "@/assets/icons/header_alarm_redDot.svg";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";
import IconButton from "../common/custom-icon-button";
import { useState } from "react";
type WishListHeaderProps = {
  wishListNumber: number;
};
const WishListHeader = ({ wishListNumber }: WishListHeaderProps) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "wish-list");
  const [isActive, setIsActive] = useState(false);

  const handleIconClick = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-center h-8">
        <p className="text-xxl">
          {t("wishList")}({wishListNumber})
        </p>
        <IconButton
          icon={alram}
          activeIcon={activeAlram}
          size={32}
          alt="alram-icon"
          isActive={isActive}
          onClick={handleIconClick}
          className="justify-self-end"
        />
      </div>
      <button className="mt-2 text-md justify-self-end text-ELSE-D9 hover:text-ELSE-55">
        {t("edit")}
      </button>
    </>
  );
};
export default WishListHeader;
