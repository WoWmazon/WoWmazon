import { useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomCheckBox = (props: InputOmitProps & { large?: boolean }) => {
  const { className, children, large, ...rest } = props;

  const uuid = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={uuid}
        className={twMerge(
          "appearance-none w-5 h-5 border border-ELSE-D9 bg-white rounded-sm checked:bi-check-sm checked:bg-SYSTEM-main checked:bg-no-repeat checked:bg-center checked:border-none",
          large && "w-7 h-7 checked:bi-check-lg",
          className
        )}
        {...rest}
      />
      <label htmlFor={uuid}>{children}</label>
    </div>
  );
};

export default CustomCheckBox;
