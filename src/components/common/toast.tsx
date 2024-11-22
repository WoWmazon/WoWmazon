"use client";

import { useEffect, useState } from "react";
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
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isShow) {
      setIsShow(false);
    }

    const firstTimer = setTimeout(() => {
      setIsShow(true);
      setIsOpen(true);
    }, 100);

    const secondTimer = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        onChange(false);
        setIsShow(false);
      }, 450);
    }, autoHideDuration);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, [open, message, autoHideDuration, error, onChange]);

  if (!open) return null; // Toast 호출 안한 경우 렌더링 방지

  return (
    <div className="absolute flex justify-center left-0 bottom-0 w-full sm:w-[375px]">
      <div
        className={twMerge(
          "fixed bottom-0 h-[52px] w-[343px] text-center content-center bg-ELSE-33 text-SYSTEM-white text-md z-30",
          isShow ? "block" : "hidden",
          isOpen && "animate-slideUp",
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
