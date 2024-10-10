import { useId } from "react";
import { twMerge } from "tailwind-merge";

type RadioProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "id"
> & {
  large?: boolean;
};

const CustomRadio = (props: RadioProps) => {
  const { className, children, large, ...rest } = props;

  const uuid = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={uuid}
        className={twMerge(
          "appearance-none w-5 h-5 border border-[#D9D9D9] bg-white rounded-full checked:bg-[#FC5660] checked:bg-[url('/circle-sm.svg')] checked:bg-no-repeat checked:bg-center checked:border-none",
          large && "w-7 h-7 checked:bg-[url('/circle-lg.svg')]",
          className
        )}
        {...rest}
      />
      <label htmlFor={uuid}>{children}</label>
    </div>
  );
};

export default CustomRadio;
