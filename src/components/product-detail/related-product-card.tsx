"use client";

import { useState } from "react";
import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowDown from "@/assets/icons/badge_arrow_down.svg";
import IconButton from "../common/custom-icon-button";
import add from "@/assets/icons/addProduct.svg";
import Toast from "../common/toast";
import { convertToKrw } from "@/utils/exchange";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/stores/common/stores";

const RelatedProductCard = ({
  relatedProduct,
  exchangeData,
}: {
  relatedProduct: ProductResultType;
  exchangeData: GetExchangeResponse;
}) => {
  const { id, image, title, price, isLowestPriceEver, discountRate } =
    relatedProduct;
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const { handleToast } = useToastStore();

  const setToast = () => {
    setIsActive(!isActive);
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: isActive ? "찜하기 추가되었습니다" : "찜하기 삭제되었습니다",
    });
  };

  const wishAddButton = () => (
    <div className="absolute bottom-2 right-3 z-10">
      <IconButton icon={add} size={32} alt="WishAddButton" onClick={setToast} />
    </div>
  );

  return (
    <div className="bg-SYSTEM-white">
      <div
        className="h-full w-[120px] cursor-pointer"
        onClick={() => router.push(`/product-detail/${id}`)}
      >
        {image ? (
          <div className="relative size-[120px] rounded-md bg-ELSE-EC overflow-hidden">
            <Image
              src={image}
              alt="product-image"
              width={120}
              height={120}
              className="size-full object-contain object-center"
            />
            {wishAddButton()}
          </div>
        ) : (
          <div className="relative bg-ELSE-EC size-[120px] rounded-md content-center justify-items-center">
            <Image src={noImage} alt="no-image" className="size-[80px] pb-3" />
            {wishAddButton()}
          </div>
        )}
        <p className="line-clamp-2 text-md text-ELSE-55 mt-3 mb-2">{title}</p>
        <p className="font-bold text-md text-SYSTEM-black">{`$ ${price}`}</p>
        <p className="text-md text-ELSE-76">
          {convertToKrw(Number(exchangeData.usdToKrw), Number(price))}
        </p>
        {(isLowestPriceEver || discountRate !== 0) && (
          <div className="flex gap-1.5 mt-2">
            {isLowestPriceEver && (
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
            {discountRate !== 0 && (
              <Badge
                text={`${discountRate}%`}
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
      <Toast />
    </div>
  );
};
export default RelatedProductCard;
