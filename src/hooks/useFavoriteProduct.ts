import { getFavoriteProduct } from "@/api/favorite/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WISH_LIST } from "@/constants/query-keys";

export const useFavoriteProductList = (params: FavoriteProductParamsType) => {
  return useInfiniteQuery({
    queryKey: [WISH_LIST],
    queryFn: ({ pageParam = ""}) => {
      const queryParams: FavoriteProductParamsType = {
        ...params,
        cursor: pageParam,
      };
      return getFavoriteProduct(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    }
  })
}