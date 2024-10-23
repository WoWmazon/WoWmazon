import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const SimpleBottomSheet = (props: SimpleBottomSheetProps) => {
  const { children, isShow, handleClose, className } = props;

  // bottom sheet 열릴 때 외부 스크롤 차단
  useEffect(() => {
    const wrapper = document.querySelector("#chidrenWrapper");
    if (wrapper instanceof HTMLElement) {
      wrapper.style.overflow = isShow ? "hidden" : "";
    }
    return () => {
      if (wrapper instanceof HTMLElement) {
        wrapper.style.overflow = "";
      }
    };
  }, [isShow]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose(); // bottom sheet 외부를 클릭했을 때 닫기
    }
  };

  if (!isShow) return null;

  return (
    <div
      id="common-simple-bottom-sheet"
      tabIndex={-1}
      className="absolute flex justify-center top-0 left-0 items-end w-full h-screen bg-ELSE-A1 bg-opacity-50"
      onClick={handleOutsideClick} // 외부 클릭 시 모달 닫기
    >
      <div
        className={twMerge(
          "fixed bottom-0 px-4 py-6 w-[375px] text-center content-center max-h-full bg-SYSTEM-white rounded-t-lg text-md z-30",
          isShow && "animate-slideUp",
          !isShow && "animate-slideDown"
        )}
      >
        <div
          className={twMerge(
            "flex w-full text-center content-center justify-center",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
