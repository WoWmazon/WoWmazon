import { useTranslation } from "@/utils/localization/client";
import IconButton from "../common/custom-icon-button";
import { twMerge } from "tailwind-merge";
import { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";

const BottomNavIconButton = ({
  icon,
  activeIcon,
  label,
  isActive,
  onClick,
}: BottomNavIconButtonProps) => {
  const { locale }: { locale: LocaleTypes } = useParams();
  const { t } = useTranslation(locale, "common");
  return (
    <div className=" filex h-[54px] flex flex-col gap-[2px] justify-center items-center">
      <IconButton
        icon={icon}
        activeIcon={activeIcon}
        size={30}
        alt={`${t(label)}Button`}
        isActive={isActive}
        onClick={onClick}
      />
      <p
        className={twMerge(
          "text-sm font-bold transition-all duration-300",
          isActive ? "text-SYSTEM-main" : "text-ELSE-55"
        )}
      >
        {t(label)}
      </p>
    </div>
  );
};
export default BottomNavIconButton;
