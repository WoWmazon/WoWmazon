"use client";

import WishListHeader from "./wish-list-header";
import WishListNoContents from "./wish-list-nonecontents";
import WishList from "./wish-list";
import { useFavoriteProductList } from "@/hooks/useFavoriteProduct";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useWishListParamStore } from "@/stores/prooduct/stores";

const WishListContainer = () => {
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
    <>
      <WishListHeader
        wishListNumber={
          wishProductData.filter((product) => product.presentPrice !== null)
            .length || 0
        }
      />
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
    </>
  );
};

export default WishListContainer;
