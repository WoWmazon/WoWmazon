import amazonIcon from "@/assets/icons/amazon_icon.svg";
import linkIcon from "@/assets/icons/link-icon.svg";
import { useBottomSheetStore, useToastStore } from "@/stores/common/stores";
import Image from "next/image";
import Link from "next/link";
import BottomSheetAddLink from "./bottom-sheet-add-link";
import { t } from "i18next";
import { useRef } from "react";
import { postLinkAddProduct } from "@/api/product/apis";
const BottomSheetAddProducts = ({ onClose }: { onClose: () => void }) => {
  const { handleBottomSheet } = useBottomSheetStore();
  const { handleToast } = useToastStore();
  const inputRef = useRef("");

  const handleLinkClick = () => {
    onClose();
    handleBottomSheet({
      isShow: true,
      children: <BottomSheetAddLink inputRef={inputRef} />,
      btnText: t("check"),
      handleAction: async () => {
        if (inputRef.current) {
          try {
            const response = await postLinkAddProduct(inputRef.current);
            if (response) {
              handleBottomSheet({ isShow: false });
              handleToast({
                open: true,
                onChange: () => handleToast({ open: false }),
                message: "상품이 성공적으로 추가되었습니다!",
              });
            }
          } catch (error) {
            handleToast({
              open: true,
              onChange: () => handleToast({ open: false }),
              message: "이미 등록되어 있거나, 유효하지 않는 링크입니다.",
            });
            console.error("에러 발생: ", error);
          }
        } else {
          handleToast({
            open: true,
            onChange: () => handleToast({ open: false }),
            message: "링크를 입력해주세요.",
          });
        }
      },
    });
  };
  return (
    <div className="w-full h-[125px]  flex flex-col gap-5 justify-center">
      <div className="flex gap-2 cursor-pointer">
        <Image src={amazonIcon} width={32} height={32} alt="amazon-icon" />
        <Link className="font-bold text-lg" href="https://www.amazon.com/">
          Amazon에서 상품 추가
        </Link>
      </div>
      <div className="flex gap-2 cursor-pointer">
        <div className="flex gap-2">
          <Image src={linkIcon} width={32} height={32} alt="amazon-icon" />
        </div>
        <div className="flex flex-col items-start" onClick={handleLinkClick}>
          <p className="font-bold text-lg">링크로 상품 추가</p>
          <p className="text-sm text-ELSE-F8">
            현재는 Amazon 상품 링크만 사용 가능해요!
          </p>
        </div>
      </div>
    </div>
  );
};
export default BottomSheetAddProducts;
