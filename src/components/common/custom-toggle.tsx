import { useId } from "react";
import { twMerge } from "tailwind-merge";

type ToggleProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "id">;

export default function CustomToggle(props: ToggleProps) {
  const { className, children, disabled, ...rest } = props;

  const uuid = useId();

  return (
    <div>
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
            "relative w-[50px] h-[30px] bg-[#AEAEAE] rounded-full peer peer-checked:after:translate-x-3/4 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-[26px] after:w-[26px] after:transition-all peer-checked:bg-[#FC5660]",
            disabled && "peer-checked:bg-[#AEAEAE]",
            className
          )}
        ></div>
        {children}
      </label>
    </div>
  );
}
