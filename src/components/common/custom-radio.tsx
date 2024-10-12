import { useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomRadio = (props: InputProps & { large?: boolean }) => {
  const { className, children, large, ...rest } = props;

  const uuid = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={uuid}
        className={twMerge(
          "appearance-none w-5 h-5 border border-ELSE-D9 bg-white rounded-full checked:bg-SYSTEM-main checked:bi-circle-sm checked:bg-no-repeat checked:bg-center checked:border-none",
          large && "w-7 h-7 checked:bi-circle-lg",
          className
        )}
        {...rest}
      />
      <label htmlFor={uuid}>{children}</label>
    </div>
  );
};

export default CustomRadio;
