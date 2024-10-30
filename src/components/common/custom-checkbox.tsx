import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomCheckBox = forwardRef<
  HTMLInputElement,
  InputOmitProps & { large?: boolean }
>((props, ref) => {
  const { className, children, large, ...rest } = props;

  const uuid = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={uuid}
        ref={ref}
        className={twMerge(
          "appearance-none flex-none size-5 border border-ELSE-D9 bg-SYSTEM-white rounded-sm",
          "checked:bi-check-sm checked:bg-SYSTEM-main checked:bg-no-repeat checked:bg-center checked:border-none",
          large && "size-7 checked:bi-check-lg",
          className
        )}
        {...rest}
      />
      <label htmlFor={uuid}>{children}</label>
    </div>
  );
});

CustomCheckBox.displayName = "Checkbox";

export default CustomCheckBox;
