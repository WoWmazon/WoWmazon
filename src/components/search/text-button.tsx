import { twMerge } from "tailwind-merge";
import CustomButton from "../common/custom-button";

const TextButton = ({ children, isActive = true }: TextButtonProps) => {
  return (
    <CustomButton
      className={twMerge(
        "text-md size-fit",
        "hover:text-ELSE-55",
        !isActive && "text-ELSE-F8"
      )}
      variant="none"
      smallSize
    >
      {children}
    </CustomButton>
  );
};
export default TextButton;
