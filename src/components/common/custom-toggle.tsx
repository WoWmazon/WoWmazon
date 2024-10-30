import { useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomToggle = (props: InputOmitProps) => {
  const { className, children, disabled, ...rest } = props;

  const uuid = useId();

  return (
    <label className="inline-flex items-center cursor-pointer" htmlFor={uuid}>
      <input
        type="checkbox"
        className="sr-only peer"
        id={uuid}
        disabled={disabled}
        {...rest}
      />
      <div
        className={twMerge(
          "relative w-[50px] h-[30px] bg-ELSE-AE rounded-full peer peer-checked:after:translate-x-3/4 peer-checked:bg-SYSTEM-main",
          "after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-SYSTEM-white after:rounded-full after:size-[26px] after:transition-all",
          disabled && "peer-checked:bg-ELSE-AE",
          className
        )}
      ></div>
      {children}
    </label>
  );
};

export default CustomToggle;
