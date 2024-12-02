"use client";

import WishListHeader from "./wish-list-header";
import WishListNoContents from "./wish-list-nonecontents";
import WishList from "./wish-list";
import {
  useFavoriteProductList,
  useSetFavoriteProduct,
} from "@/hooks/useFavoriteProduct";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  useWishEditStore,
  useWishListParamStore,
} from "@/stores/prooduct/stores";
import WishListEditHeader from "./wish-list-edit-header";
import CustomButton from "../common/custom-button";
import { WISH_LIST } from "@/constants/query-keys";

const WishListContainer = () => {
  const favoriteParams = useWishListParamStore((state) => state.favoriteParams);
  const { editList, isEditing, setIsEditing, clearEditList } =
    useWishEditStore();
  const { deleteWishList } = useSetFavoriteProduct([WISH_LIST]);

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

  const handleEditClose = () => {
    setIsEditing(false);
    clearEditList();
  };

  const handleDeleteWishList = () => {
    deleteWishList(editList);
  };

  return (
    <div className="flex flex-col">
      {isEditing ? (
        <WishListEditHeader
          count={editList.length ?? 0}
          onClose={handleEditClose}
        />
      ) : (
        <WishListHeader
          wishListNumber={wishProductData.length || 0}
          openEdit={() => setIsEditing(true)}
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
      {isEditing && (
        <div className="fixed w-full max-w-[500px] bottom-0 py-5 px-4 mt-auto bg-SYSTEM-white z-30">
          <CustomButton
            variant={editList.length > 0 ? "filled" : "disabled"}
            disabled={!editList.length}
            onClick={handleDeleteWishList}
          >
            삭제
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default WishListContainer;
