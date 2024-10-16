"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Toast = ({
  message,
  open,
  onChange,
  type,
  autoHideDuration = 3000,
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setIsOpen(false);
      await new Promise((resolve) => {
        setTimeout(resolve, 450);
      });
      onChange(false);
    }, autoHideDuration);
  }, []);

  return (
    <div className="fixed flex justify-center bottom-0 left-1/2 w-full -translate-x-1/2">
      <div
        className={twMerge(
          "fixed bottom-0 h-[52px] w-[96%] sm:w-[343px] text-center content-center bg-ELSE-33 text-SYSTEM-white text-md z-[9999]",
          open && isOpen && "animate-slideUp",
          !isOpen && "animate-slideDown",
          `${type && type === "error" ? "bg-ELSE-FF2 text-ELSE-F60" : ""}`
        )}
        role="alert"
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
