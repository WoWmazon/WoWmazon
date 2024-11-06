"use client";
import { useState } from "react";
import CustomButton from "../common/custom-button";
import IconButton from "../common/custom-icon-button";
import add from "@/assets/icons/addProduct.svg";
import alarmOn from "@/assets/icons/product_alarmOn.svg";
import alarmOff from "@/assets/icons/product_alarmOff.svg";
import Toast from "../common/toast";

const ProductDetailNav = ({ isFavorite }: { isFavorite: boolean }) => {
  // const [isAdd, setIsAdd] = useState(false); // 찜하기 연결 전 테스트용
  const [isWished, setIsWished] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleAdd = () => {
    // setIsAdd(!isAdd); // 찜하기 연결 전 테스트용
    setIsWished(!isWished);
    setIsAlarm(true);
  };

  const handleAlarm = () => {
    setIsAlarm(!isAlarm);
    setIsActive(!isActive);
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
          />
        )}
        {isFavorite && (
          <IconButton
            icon={isAlarm ? alarmOn : alarmOff}
            size={60}
            alt="AlarmOn"
            onClick={handleAlarm}
          />
        )}
      </div>
      {isWished && (
        <Toast
          open={isWished}
          onChange={setIsWished}
          message={"찜하기 추가되었습니다"}
        />
      )}
      {isActive && (
        <Toast
          open={isActive}
          onChange={setIsActive}
          message={isAlarm ? "알림 설정되었습니다" : "알림 해제되었습니다"}
        />
      )}
    </div>
  );
};

export default ProductDetailNav;
