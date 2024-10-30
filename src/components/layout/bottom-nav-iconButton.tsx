import IconButton from "../common/custom-icon-button";
import { twMerge } from "tailwind-merge";

const BottomNavIconButton = ({
  icon,
  activeIcon,
  label,
  isActive,
  onClick,
}: BottomNavIconButtonProps) => {
  return (
    <div className=" filex w-[53px] h-[54px] flex flex-col gap-[2px] justify-center items-center">
      <IconButton
        icon={icon}
        activeIcon={activeIcon}
        size={30}
        alt={`${label}Button`}
        isActive={isActive}
        onClick={onClick}
      />
      <p
        className={twMerge(
          "text-sm font-bold",
          isActive ? "text-SYSTEM-main" : "text-ELSE-55"
        )}
      >
        {label}
      </p>
    </div>
  );
};
export default BottomNavIconButton;
