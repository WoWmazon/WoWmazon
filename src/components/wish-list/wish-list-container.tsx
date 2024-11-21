"use server";

import { useFavoriteProductList } from "@/hooks/useFavoriteProduct";
import WishListHeader from "./wish-list-header";
import WishListNoContents from "./wish-list-nonecontents";
// import { QueryClient } from "@tanstack/react-query";

const WishListContainer = async ({ params: { locale } }: PageProps) => {

  // const queryClient = new QueryClient();
  // const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useFavoriteProductList(params);

  const number = 5; //예시

  return (
    <>
      <WishListHeader wishListNumber={number} />
      <WishListNoContents locale={locale} />
    </>
  );
};

export default WishListContainer;
