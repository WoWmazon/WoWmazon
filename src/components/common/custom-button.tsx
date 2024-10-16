import clsx from "clsx";

const CustomButton = ({
  height,
  variant = "filled",
  fontWeight = "normal",
  className,
  ...props
}: CustomButtonProps) => {
  const buttonClass = clsx(
    "rounded-sm cursor-pointer  w-full text-lg flex  justify-center items-center", // 공통 스타일
    {
      " h-11": height === "small",
      "h-14": height === "large",
      "bg-SYSTEM-main text-SYSTEM-white": variant === "filled",
      "bg-ELSE-D9 text-SYSTEM-white ": variant === "disabled",
      "bg-SYSTEM-white border border-ELSE-D9 text-ELSE-D9":
        variant === "outline",
      "bg-SYSTEM-white border border-SYSTEM-main text-SYSTEM-main":
        variant === "outlineColor",
      "font-bold": fontWeight === "bold",
      "font-normal": fontWeight === "normal",
    },
    className
  );

  return <button className={buttonClass} {...props} />;
};

export default CustomButton;
