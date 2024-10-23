"use client";

import headerArrow from "@/assets/icons/header_arrow.svg";
import detailExport from "@/assets/icons/detail_export.svg";
import detailTrash from "@/assets/icons/detail_trash.svg";
import IconButton from "../common/custom-icon-button";
import { useState } from "react";

const ProductDetailHeader = () => {
  const [isWished, setIsWished] = useState(true); // 임시 state / API 연결하면 isFavorite 값 사용
  const [isActive, setIsActive] = useState(false);

  const handleIconClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="p-4 border border-ELSE-EC bg-SYSTEM-white">
      <div className="grid grid-cols-[32px_auto_80px] items-center h-[32px] gap-[6px]">
        <IconButton
          icon={headerArrow}
          size={32}
          alt="arrow-icon"
          isActive={isActive}
          onClick={handleIconClick}
          className="justify-self-end"
        />
        <p className="text-xl justify-center content-center text-center font-bold ml-10">
          상품 상세
        </p>
        <div className="justify-self-end">
          <IconButton
            icon={detailExport}
            size={32}
            alt="arrow-icon"
            isActive={isActive}
            onClick={handleIconClick}
          />
          {isWished && (
            <IconButton
              icon={detailTrash}
              size={32}
              alt="arrow-icon"
              isActive={isActive}
              onClick={handleIconClick}
              className="ml-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetailHeader;
