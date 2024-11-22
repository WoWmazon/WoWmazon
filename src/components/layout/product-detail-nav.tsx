"use client";
import { useState } from "react";
import CustomButton from "../common/custom-button";
import IconButton from "../common/custom-icon-button";
import add from "@/assets/icons/addProduct.svg";
import alarmOn from "@/assets/icons/product_alarmOn.svg";
import alarmOff from "@/assets/icons/product_alarmOff.svg";
import Toast from "../common/toast";
import { postFavoriteProduct } from "@/api/favorite/apis";
import { useToastStore } from "@/stores/common/stores";

const ProductDetailNav = (product: GetProductDatailResponse) => {
  const { id, isFavorite } = product;

  const [isWished, setIsWished] = useState(false);
  const [isAlarmState, setIsAlarmState] = useState(false);

  const { handleToast } = useToastStore();

  // + 버튼 클릭 시 찜하기 추가 함수
  const handleAdd = async () => {
    try {
      const response = await postFavoriteProduct(id);
      if (response?.productId) {
        handleToast({
          open: true,
          onChange: () => handleToast({ open: false }),
          message: "찜하기 추가되었습니다",
        });
      }
    } catch (error) {
      console.log("에러 : ", error);
    }
    setIsWished(!isWished);
    setIsAlarmState(true);
    setIsAlarmState(true);
  };

  // isFavorite: true(찜한 상품)일 경우 알림 허용/비허용으로 toast 처리만
  // isFavorite: true(찜한 상품)일 경우 알림 허용/비허용으로 toast 처리만
  const handleAlarm = () => {
    setIsAlarmState(!isAlarmState);
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: isAlarmState ? "알림 설정되었습니다" : "알림 해제되었습니다",
    });
    setIsAlarmState(!isAlarmState);
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: isAlarmState ? "알림 설정되었습니다" : "알림 해제되었습니다",
    });
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[375px] h-24 border-t border-ELSE-EC bg-SYSTEM-white px-4 pl-5 content-center">
      <div className="flex gap-4">
        <CustomButton variant="filled">구매하러 가기</CustomButton>
        {!isFavorite && (
          <IconButton
            icon={add}
            size={60}
            alt="AddButton"
            onClick={handleAdd}
            className="cursor-pointer"
            className="cursor-pointer"
          />
        )}
        {isFavorite && (
          <IconButton
            icon={isAlarmState ? alarmOn : alarmOff}
            icon={isAlarmState ? alarmOn : alarmOff}
            size={60}
            alt="AlarmOn"
            onClick={handleAlarm}
            className="cursor-pointer"
            className="cursor-pointer"
          />
        )}
      </div>
      <Toast />
      <Toast />
    </div>
  );
};

export default ProductDetailNav;
