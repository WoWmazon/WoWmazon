import Image from "next/image";
import { clsx } from "clsx";

const Badge = ({
  text,
  height = "h-7",
  backgroundColor = "bg-ELSE-FF3",
  textColor = "text-SYSTEM-main",
  textSize = "text-sm",
  hasIcon = false,
  iconWidth = 12,
  iconSrc,
}: BadgeProps) => {
  const formattedText = typeof text === "number" ? `${text} %` : text;
  return (
    <div
      className={clsx(
        "flex items-center gap-1 rounded-sm px-1 w-fit",
        height,
        backgroundColor
      )}
    >
      {hasIcon && iconSrc && (
        <Image
          src={iconSrc}
          alt="badge-icon"
          width={iconWidth}
          height={iconWidth}
        />
      )}
      <span className={clsx(textColor, textSize)}>{formattedText} </span>
    </div>
  );
};

export default Badge;
