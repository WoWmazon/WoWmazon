"use client";

import { useState } from "react";
import WishListHeader from "./wish-list-header";
import WishListNoContents from "./wish-list-nonecontents";
import WishList from "./wish-list";
import { useFavoriteProductList } from "@/hooks/useFavoriteProduct";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useWishListParamStore } from "@/stores/prooduct/stores";
import WishListEditHeader from "./wish-list-edit-header";
import CustomButton from "../common/custom-button";

const WishListContainer = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const favoriteParams = useWishListParamStore((state) => state.favoriteParams);

  const {
    data: wishProducts,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFavoriteProductList({
    ...favoriteParams,
  });

  const wishProductData =
    wishProducts?.pages.flatMap((page) =>
      page.results.map((result) => ({
        favoriteId: result.id,
        id: result.product.id,
        image: result.product.image,
        presentPrice: result.product.presentPrice,
        isOutOfStock: result.product.isOutOfStock,
        discountRate: result.product.discountRate,
        isStopSelling: result.product.isStopSelling,
        title: result.product.title,
        isLowestPriceEver: result.product.isLowestPriceEver,
        isAlarm: result.isAlarm,
      }))
    ) || [];

  const intersectionObserverRef = useIntersectionObserver({
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
  });

  return (
    <div className="flex flex-col">
      {isEditOpen ? (
        <WishListEditHeader onClose={() => setIsEditOpen(false)} />
      ) : (
        <WishListHeader
          wishListNumber={wishProductData.length || 0}
          openEdit={() => setIsEditOpen(true)}
        />
      )}
      {wishProductData.length ? (
        <WishList
          products={wishProductData}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          isError={isError}
          intersectionObserverRef={intersectionObserverRef}
        />
      ) : (
        <WishListNoContents />
      )}
      {isEditOpen && (
        <div className="fixed w-full max-w-[375px] bottom-0 py-5 px-4 mt-auto bg-SYSTEM-white z-30">
          <CustomButton variant="filled">삭제</CustomButton>
        </div>
      )}
    </div>
  );
};

export default WishListContainer;
