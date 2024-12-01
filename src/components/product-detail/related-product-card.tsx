"use client";

import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowDown from "@/assets/icons/badge_arrow_down.svg";
import IconButton from "../common/custom-icon-button";
import addProduct from "@/assets/icons/addProduct.svg";
import addProductGray from "@/assets/icons/addProduct_gray.svg";
import { convertToKrw } from "@/utils/exchange";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/stores/common/stores";
import { RELATED_PRODUCT } from "@/constants/query-keys";
import { useSetFavoriteProduct } from "@/hooks/useFavoriteProduct";

const RelatedProductCard = ({
  relatedProduct,
  exchangeRate,
}: {
  relatedProduct: ProductResultType;
  exchangeRate: GetExchangeRateResponse;
}) => {
  const {
    id,
    image,
    title,
    presentPrice,
    isLowestPriceEver,
    discountRate,
    isFavorite,
  } = relatedProduct;
  const router = useRouter();

  const { handleToast } = useToastStore();
  const { addWishList } = useSetFavoriteProduct([RELATED_PRODUCT]);

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

  const wishAddButton = () => (
    <div className="absolute bottom-2 right-3 z-10">
      <IconButton
        icon={isFavorite ? addProductGray : addProduct}
        size={32}
        alt="WishAddButton"
        onClick={handleAdd}
      />
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
        <p className="font-bold text-md text-SYSTEM-black">{`$ ${presentPrice}`}</p>
        <p className="text-md text-ELSE-76">
          {convertToKrw(exchangeRate.usdToKrw, Number(presentPrice))}
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
    </div>
  );
};
export default RelatedProductCard;
