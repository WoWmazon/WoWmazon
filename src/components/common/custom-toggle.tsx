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
          "relative w-[50px] h-[30px] bg-ELSE-AE rounded-full peer peer-checked:after:translate-x-3/4 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-[26px] after:w-[26px] after:transition-all peer-checked:bg-SYSTEM-main",
          disabled && "peer-checked:bg-ELSE-AE",
          className
        )}
      ></div>
      {children}
    </label>
  );
};

export default CustomToggle;
