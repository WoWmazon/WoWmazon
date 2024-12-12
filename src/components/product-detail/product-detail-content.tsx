"use client";

import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowDown from "@/assets/icons/badge_arrow_down.svg";
import CustomButton from "../common/custom-button";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { convertToKrw, getFormattedExchangeText } from "@/utils/exchange";
import { twMerge } from "tailwind-merge";

const ProductDetailContent = ({
  product,
  exchangeRate,
}: {
  product: GetProductDetailResponse;
  exchangeRate: GetExchangeRateResponse;
}) => {
  const {
    image,
    title,
    isLowestPriceEver,
    discountRate,
    price,
    presentPrice,
    crawlingUpdatedAt,
    presentPriceUpdatedAt,
    optionStatus,
  } = product;

  if (!product) return null;

  return (
    <div className="bg-SYSTEM-white">
      <div
        className={twMerge(
          "relative w-full justify-items-center content-center aspect-square",
          image ?? "bg-ELSE-EC"
        )}
      >
        {image ? (
          <Image
            className="object-contain"
            src={image}
            alt="product-image"
            fill
            sizes="100%"
          />
        ) : (
          <Image
            src={noImage}
            alt="no-image"
            style={{ width: "50%", height: "50%" }}
          />
        )}
      </div>
      <div className="p-4 border border-ELSE-EC">
        <p className="mb-2.5">{title}</p>
        <div className="flex gap-1.5 mb-1">
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
        <div className="flex gap-2 text-ELSE-F8">
          <p>List Price</p>
          <p className="line-through">{`$ ${price}`}</p>
        </div>
        <div className="flex gap-2 content-center">
          <p className="text-xxl font-bold">{`\$ ${presentPrice}`}</p>
          <p className="content-center text-ELSE-55">
            {convertToKrw(exchangeRate.usdToKrw, Number(presentPrice))}
          </p>
        </div>
        <p className="text-sm text-ELSE-76 mb-3">
          {getFormattedExchangeText(
            exchangeRate.usdToKrw,
            exchangeRate.createdAt.toString()
          )}
        </p>
        <div className="text-md px-3 py-2 bg-ELSE-F5 mb-3">
          <p className="font-bold">아마존 가격</p>
          <p className="text-ELSE-55">
            {`마지막 업데이트 : 
            ${formatDistanceToNow(crawlingUpdatedAt, {
              addSuffix: true,
              locale: ko,
            })}
            , 마지막 가격 변경: ${formatDistanceToNow(presentPriceUpdatedAt, {
              addSuffix: true,
              locale: ko,
            })}`}
          </p>
        </div>
        {optionStatus && (
          <CustomButton variant="outlineColor">
            더 많은 옵션 보러가기
          </CustomButton>
        )}
      </div>
    </div>
  );
};
export default ProductDetailContent;
