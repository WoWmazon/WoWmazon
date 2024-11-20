"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Toast = ({
  message,
  onChange,
  error = false,
  autoHideDuration = 3000,
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
      setToastMessage(message);
    }, 100);

    const timer = setTimeout(async () => {
      setIsOpen(false);
      await new Promise((resolve) => {
        setTimeout(resolve, 450);
      });
      onChange(false);
      setToastMessage("");
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
      setToastMessage("");
    };
  }, [message, autoHideDuration, error, onChange]);

  if (toastMessage === "") {
    return <></>;
  }

  return (
    <div className="absolute flex justify-center left-0 bottom-0 w-full sm:w-[375px]">
      <div
        className={twMerge(
          "fixed bottom-0 h-[52px] w-[343px] text-center content-center bg-ELSE-33 text-SYSTEM-white text-md z-30",
          isOpen && "animate-slideUp",
          !isOpen && "animate-slideDown",
          error && "bg-ELSE-FF2 text-ELSE-F60"
        )}
        role="alert"
      >
        {toastMessage}
      </div>
    </div>
  );
};

export default Toast;
