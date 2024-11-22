"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useToastStore } from "@/stores/common/stores";

const Toast = () => {
  const {
    message,
    open,
    onChange,
    error = false,
    autoHideDuration = 3000,
  } = useToastStore();
  const [isOpen, setIsOpen] = useState(true);

  setTimeout(async () => {
    setIsOpen(false);
    await new Promise((resolve) => {
      setTimeout(resolve, 450);
    });
    onChange(false);
  }, autoHideDuration);

  if (!open) return null; // Toast 호출 안한 경우 렌더링 방지

  return (
    <div className="absolute flex justify-center left-0 bottom-0 w-full sm:w-[375px]">
      <div
        className={twMerge(
          "fixed bottom-0 h-[52px] w-[343px] text-center content-center bg-ELSE-33 text-SYSTEM-white text-md z-30",
          open && isOpen && "animate-slideUp",
          !isOpen && "animate-slideDown",
          error && "bg-ELSE-FF2 text-ELSE-F60"
        )}
        role="alert"
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
