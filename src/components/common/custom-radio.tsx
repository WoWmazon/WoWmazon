import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomRadio = forwardRef<HTMLInputElement, CustomRadioProps>(
  (props, ref) => {
    const { className, children, large, isRadioHidden, ...rest } = props;

    const uuid = useId();

    return (
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id={uuid}
          ref={ref}
          className={twMerge(
            "appearance-none w-5 h-5 border border-ELSE-D9 bg-white rounded-full cursor-pointer",
            "checked:bg-SYSTEM-main checked:bi-circle-sm checked:bg-no-repeat checked:bg-center checked:border-none",
            large && "w-7 h-7 checked:bi-circle-lg",
            isRadioHidden && "hidden",
            className
          )}
          {...rest}
        />
        <label htmlFor={uuid} className="cursor-pointer">
          {children}
        </label>
      </div>
    );
  }
);

CustomRadio.displayName = "Radio";

export default CustomRadio;
