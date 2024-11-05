import { getProductList } from "@/api/product/apis";
import { PRODUCT_LIST } from "@/constants/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteScrollProductList = () => {
  return useInfiniteQuery({
    queryKey: [PRODUCT_LIST],
    queryFn: ({ pageParam = "" }) => {
      const params: ProductParamsType = pageParam ? { cursor: pageParam } : {};
      return getProductList(params);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
  });
};
