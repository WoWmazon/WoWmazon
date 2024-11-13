import { getProductList } from "@/api/product/apis";
import { PRODUCT_LIST } from "@/constants/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteScrollProductList = (params: ProductParamsType) => {
  return useInfiniteQuery({
    queryKey: [PRODUCT_LIST, params],
    queryFn: ({ pageParam = "" }) => {
      const queryParams: ProductParamsType = {
        ...params,
        cursor: pageParam,
      };
      return getProductList(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
  });
};
