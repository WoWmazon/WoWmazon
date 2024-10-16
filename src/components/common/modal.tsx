"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Modal = (props: ModalProps) => {
  const {
    isShow,
    title,
    content,
    btnText,
    handleAction,
    icon,
    optionalBtnText,
    handleOptional,
  } = props;
  const textAlign = icon ? "text-center" : ""; // icon 있으면 text-align: center 적용

  return (
    <div>
      {isShow && (
        <div
          id="common-popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
        >
          <div
            className={twMerge(
              "relative px-4 py-6 w-[343px] max-h-full bg-white rounded-lg",
              textAlign
            )}
          >
            {icon && (
              <div className="flex justify-center mb-4">
                <Image src={icon} alt="Icon" width={56} height={56} />
              </div>
            )}
            <h1 className="mb-5 text-xl font-bold text-SYSTEM-black">
              {title}
            </h1>
            <h3 className="mb-5 text-lg text-ELSE-55">{content}</h3>
            <div className="flex w-full h-14">
              {optionalBtnText && (
                <button
                  onClick={handleOptional}
                  className="mr-3 p-[15px] text-lg font-bold text-ELSE-F8 bg-white border border-ELSE-EC rounded-sm hover:bg-gray-100 hover:text-gray-500 flex-1"
                >
                  {optionalBtnText}
                </button>
              )}
              <button
                onClick={handleAction}
                className="p-[15px] text-lg font-bold text-white bg-SYSTEM-main rounded-sm hover:bg-red-500 flex-1"
              >
                {btnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
