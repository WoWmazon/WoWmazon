import { getFavoriteProduct } from "@/api/favorite/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WISH_LIST } from "@/constants/query-keys";

export const useFavoriteProductList = (params: FavoriteProductParamsType) => {
  return useInfiniteQuery({
    queryKey: [WISH_LIST, params],
    queryFn: ({ pageParam = "" }) => {
      const queryParams: FavoriteProductParamsType = {
        ...params,
        cursor: pageParam,
      };
      return getFavoriteProduct(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.cursor) {
        return undefined; // 추가 요청이 없음을 명시
      }
      return lastPage.cursor;
    },
  });
};
