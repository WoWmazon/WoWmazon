"use client";

import CustomButton from "../common/custom-button";
import IconButton from "../common/custom-icon-button";
import add from "@/assets/icons/addProduct.svg";
import alarmOn from "@/assets/icons/product_alarmOn.svg";
import alarmOff from "@/assets/icons/product_alarmOff.svg";
import { useSetAlarm, useSetFavoriteProduct } from "@/hooks/useFavoriteProduct";
import { PRODUCT_DETAIL } from "@/constants/query-keys";

const ProductDetailNav = (product: GetProductDetailResponse) => {
  const { id, favoriteId, isFavorite, isAlarm } = product;

  const { addWishList } = useSetFavoriteProduct([PRODUCT_DETAIL, `${id}`]);
  const { editAlarm } = useSetAlarm([PRODUCT_DETAIL, `${id}`]);

  const handleAdd = async () => {
    await addWishList(id);
  };

  const handleAlarm = async () => {
    await editAlarm({ id: favoriteId, isAlarm: !isAlarm });
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
    </div>
  );
};

export default ProductDetailNav;
