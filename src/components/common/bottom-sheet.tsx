import { twMerge } from "tailwind-merge";
import CustomButton from "./custom-button";
import Image from "next/image";
import CloseButton from "@/assets/icons/closeButton.svg";
import { useState, useEffect } from "react";

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    children,
    isShow,
    hasDelBtn,
    handleClose,
    title,
    className,
    btnText,
    handleAction,
    optionalBtnText,
    handleOptional,
  } = props;
  const [show, setShow] = useState(isShow);

  const onClose = () => {
    handleClose(); // bottom sheet 외부를 클릭했을 때 닫기
    setShow(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setShow(isShow);

    // 모달 열릴 때 외부 스크롤 차단
    document.body.style.overflow = isShow ? "hidden" : "";
    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 복원
    };
  }, [isShow]);

  return (
    <>
      <div
        id="common-bottom-sheet"
        tabIndex={-1}
        className="absolute flex justify-center bottom-0 inset-0 z-50 items-end w-full h-full bg-ELSE-A1 bg-opacity-50"
        onClick={handleOutsideClick} // 외부 클릭 시 닫기
      >
        <div
          className={twMerge(
            "fixed bottom-0 px-4 pt-3 pb-5 w-[375px] text-center content-center max-h-full rounded-t-[20px] bg-SYSTEM-white text-md z-30",
            className,
            show && "animate-slideUp",
            !show && "animate-slideDown",
            className
          )}
        >
          <h1 className="mb-4 text-lg font-bold text-SYSTEM-black">{title}</h1>
          {hasDelBtn && (
            <div
              className="cursor-pointer absolute top-3.5 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-5 h-5 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <Image
                src={CloseButton}
                alt="bottomSheetClose"
                width={16}
                height={16}
              />
            </div>
          )}
          {children}
          <div className="flex w-full h-14 mt-4">
            {optionalBtnText && (
              <CustomButton
                variant="outline"
                className="mr-3"
                onClick={handleOptional}
              >
                {optionalBtnText}
              </CustomButton>
            )}
            <CustomButton variant="filled" onClick={handleAction}>
              {btnText}
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};
