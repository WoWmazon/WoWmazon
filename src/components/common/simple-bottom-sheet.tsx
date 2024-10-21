import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const SimpleBottomSheet = (props: SimpleBottomSheetProps) => {
  const { children, isShow, handleClose, className } = props;

  // bottom sheet 열릴 때 외부 스크롤 차단
  useEffect(() => {
    document.body.style.overflow = isShow ? "hidden" : "";
    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 복원
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
      className="absolute inset-0 z-50 flex justify-center items-end w-full h-full bottom-0 bg-ELSE-A1 bg-opacity-50 "
      onClick={handleOutsideClick} // 외부 클릭 시 모달 닫기
    >
      <div
        className={twMerge(
          "px-4 py-6 w-[375px] max-h-full bg-white rounded-t-lg text-center content-center text-md z-30 sticky bottom-0",
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
