"use client";

import Image from "next/image";
import IconButton from "../common/custom-icon-button";
import addProduct from "@/assets/icons/addProduct.svg";
import addProductGray from "@/assets/icons/addProduct_gray.svg";
import alarmOn from "@/assets/icons/product_alarmOn.svg";
import alarmOff from "@/assets/icons/product_alarmOff.svg";
import Badge from "../common/badge";
import arrowDowm from "@/assets/icons/badge_arrow_down.svg";
import defaultIcon from "@/assets/icons/product_default_img.svg";
import { useRouter } from "next/navigation";
import { useSetAlarm, useSetFavoriteProduct } from "@/hooks/useFavoriteProduct";
import { PRODUCT_LIST, WISH_LIST } from "@/constants/query-keys";
import { useToastStore } from "@/stores/common/stores";
import { isUndefined } from "@/utils/type-guard";
import { convertToKrw } from "@/utils/exchange";

const ProductCard = ({
  product,
  exchangeRate,
}: {
  product: productPostCardProps;
  exchangeRate: GetExchangeRateResponse;
}) => {
  const {
    id,
    image,
    title,
    presentPrice,
    discountRate,
    isFavorite = true,
    isAlarm,
    favoriteId,
    isLowestPriceEver,
  } = product;
  const router = useRouter();
  const { handleToast } = useToastStore();
  const { addWishList } = useSetFavoriteProduct([PRODUCT_LIST]);
  const { editAlarm } = useSetAlarm([WISH_LIST]);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isFavorite) {
      await addWishList(id);
    } else {
      handleToast({
        open: true,
        onChange: () => handleToast({ open: false }),
        message: "이미 찜한 상품입니다",
      });
    }
  };

  const handleAlarm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await editAlarm({ id: favoriteId!, isAlarm: !isAlarm });
  };

  return (
    <div
      className="w-full h-[136px]  py-4 border-b-[1px] border-ELSE-EC cursor-pointer"
      onClick={() => router.push(`/product-detail/${id}`)}
    >
      <div className="grid grid-cols-[80px_auto] gap-3">
        {/* 상품이미지 */}
        <div className="size-20 flex justify-center items-center bg-ELSE-EC">
          <Image
            className="size-full object-contain object-center"
            src={image || defaultIcon}
            alt="Image"
            width={66}
            height={47}
            priority
          />
        </div>
        {/* 이미지 제외 컴포넌트 */}
        <div className="flex flex-col gap-5">
          {/* 상품명과 아이콘버튼 */}
          <div className="grid grid-cols-[auto_32px] h-10 gap-3">
            <p className="h-10  text-md text-ELSE-55 line-clamp-2">{title}</p>
            {isUndefined(favoriteId) ? (
              <IconButton
                icon={isFavorite ? addProductGray : addProduct}
                size={32}
                alt="add-icon"
                onClick={handleAdd}
              />
            ) : (
              <IconButton
                icon={isAlarm ? alarmOn : alarmOff}
                size={32}
                alt="alarm-icon"
                onClick={handleAlarm}
              />
            )}
          </div>
          <div className="flex justify-between">
            {/* 뱃지랑 최저가 */}
            <div>
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
            </div>
            {/* 현재 가격이랑 뱃지 */}
            <div className="justify-end">
              <div className="justify-self-end mb-1">
                <p className="tabular-nums text-md font-bold ">
                  $ {presentPrice}
                </p>
              </div>
              <div className="flex gap-[6px]">
                <p className="text-md text-ELSE-76">
                  {convertToKrw(exchangeRate.usdToKrw, Number(presentPrice))}
                </p>
                <Badge
                  text={discountRate}
                  height="h-[18px]"
                  hasIcon={true}
                  iconSrc={arrowDowm}
                  backgroundColor="bg-ELSE-FF3"
                  textColor="text-SYSTEM-main"
                  textSize="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
