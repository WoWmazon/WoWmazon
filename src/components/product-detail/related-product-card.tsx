"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowDown from "@/assets/icons/badge_arrow_down.svg";
import IconButton from "../common/custom-icon-button";
import add from "@/assets/icons/addProduct.svg";
import Toast from "../common/toast";
import { convertToKrw } from "@/utils/exchange";
import { getExchangeLatest } from "@/api/exchange/apis";
import { useRouter } from "next/navigation";

const RelatedProductCard = (props: GetRelatedProductListResponse) => {
  const router = useRouter();
  const [isWished, setIsWished] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleIconClick = () => {
    setIsWished(!isWished);
    setIsActive(!isActive);
  };

  return (
    <div className="bg-SYSTEM-white">
      <div
        className="h-full w-[120px] cursor-pointer"
        onClick={() => router.push(`/product-detail/${props.id}`)}
      >
        {props.image ? (
          <div className="relative size-[120px] rounded-md bg-ELSE-EC overflow-hidden">
            <Image
              src={props.image}
              alt="product-image"
              width={120}
              height={120}
              className="size-full object-contain object-center"
            />
            <div className="absolute bottom-2 right-3 z-10">
              <IconButton
                icon={add}
                size={32}
                alt="WishAddButton"
                onClick={handleIconClick}
              />
            </div>
          </div>
        ) : (
          <div className="relative bg-ELSE-EC size-[120px] rounded-md content-center justify-items-center">
            <Image src={noImage} alt="no-image" className="size-[80px] pb-3" />
            <div className="absolute bottom-2 right-3 z-10">
              <IconButton
                icon={add}
                size={32}
                alt="WishAddButton"
                onClick={handleIconClick}
              />
            </div>
          </div>
        )}
        <p className="line-clamp-2 text-md text-ELSE-55 mt-3 mb-2">
          {props.title}
        </p>
        <p className="font-bold text-md text-SYSTEM-black">{`$ ${props.price}`}</p>
        <p className="text-md text-ELSE-76">
          {convertToKrw(Number(props.exchangeData.usdToKrw), props.price)}
        </p>
        {(props.isLowestPriceEver || props.discountRate !== 0) && (
          <div className="flex gap-1.5 mt-2">
            {props.isLowestPriceEver && (
              <Badge
                text="역대최저가"
                height="h-[18px]"
                hasIcon={false}
                backgroundColor="bg-ELSE-F0"
                textColor="text-ELSE-C1"
                textSize="text-sm"
                iconWidth={12}
              />
            )}
            {props.discountRate !== 0 && (
              <Badge
                text={`${props.discountRate}%`}
                height="h-[18px]"
                hasIcon={true}
                iconSrc={arrowDown}
                backgroundColor="bg-ELSE-FF3"
                textColor="text-SYSTEM-main"
                textSize="text-sm"
                iconWidth={12}
              />
            )}
          </div>
        )}
      </div>
      {isWished && (
        <Toast
          open={isWished}
          onChange={setIsWished}
          message={isActive ? "찜하기 추가되었습니다" : "찜하기 삭제되었습니다"}
        />
      )}
    </div>
  );
};
export default RelatedProductCard;
