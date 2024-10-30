import { twMerge } from "tailwind-merge";

const variantStyles = {
  filled: "bg-SYSTEM-main text-SYSTEM-white hover:bg-red-500",
  disabled: "bg-ELSE-D9 text-SYSTEM-white ",
  outline:
    "bg-SYSTEM-white border border-ELSE-D9 text-ELSE-D9 hover:bg-gray-100 hover:text-gray-400",
  outlineColor:
    "bg-SYSTEM-white border border-SYSTEM-main text-SYSTEM-main hover:bg-red-100",
};
const sizeStyles = {
  small: "h-11 font-normal",
  large: "h-14 font-bold",
};

const CustomButton = ({
  smallSize,
  variant = "filled",
  className,
  ...props
}: CustomButtonProps) => {
  const size = smallSize ? "small" : "large";
  const buttonClass = twMerge(
    "rounded-sm cursor-pointer w-full text-lg flex justify-center items-center",
    variantStyles[variant as keyof typeof variantStyles],
    sizeStyles[size as keyof typeof sizeStyles],
    className
  );

  return <button className={buttonClass} {...props} />;
};

export default CustomButton;
