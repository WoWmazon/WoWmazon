"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import InputDeleteButton from "@/assets/icons/input-delete-button.svg";

const inputStyles = {
  outline: "border border-ELSE-D9",
  filled: "border-none bg-ELSE-F5",
};

const inputSizes = {
  small: "h-11",
  large: "h-14",
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      type = "text",
      value,
      size = "large",
      variant = "outline",
      onChange,
      hasDelBtn = false,
      className,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    // 외부에서 받은 ref와 로컬 ref를 연결
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleDeleteValue = () => {
      if (onChange) {
        if (inputRef.current) {
          inputRef.current.value = "";
          // React의 onChange 핸들러를 수동으로 호출
          const syntheticEvent = {
            target: inputRef.current,
            currentTarget: inputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
          inputRef.current.focus();
        }
      }
    };

    return (
      <div
        className={twMerge(
          "relative flex flex-row items-center w-full rounded-sm",
          inputStyles[variant as keyof typeof inputStyles],
          inputSizes[size as keyof typeof inputSizes],
          className
        )}
      >
        <input
          type={type}
          ref={inputRef}
          className={twMerge(
            "w-full h-full px-4 py-[14px] bg-transparent text-ELSE-33 text-lg placeholder:text-ELSE-AE focus:outline-none",
            size === "small" && "py-0",
            hasDelBtn && "pr-9"
          )}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {hasDelBtn && value && (
          <div
            className="absolute right-5 cursor-pointer"
            onClick={handleDeleteValue}
          >
            <Image
              src={InputDeleteButton}
              alt="input-delete"
              width={10}
              height={10}
            />
          </div>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "Input";

export default CustomInput;
