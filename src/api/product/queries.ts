import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";
import { INFINITE_SEARCH_PRODUCT } from "@/constants/query-keys";

export const useInfiniteSearchProduct = (data: SearchParamsType) =>
  useInfiniteQuery({
    queryKey: [INFINITE_SEARCH_PRODUCT, data],
    queryFn: ({ pageParam }) => {
      return getProductListBySearch({ ...data, cursor: pageParam });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
    gcTime: 0,
  });
