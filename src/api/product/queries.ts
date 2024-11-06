import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";
import { INFINITE_SEARCH_PRODUCT } from "@/constants/query-keys";

export const useInfiniteSearchProduct = (
  data: SearchParamsType,
  flag: boolean
) =>
  useInfiniteQuery({
    queryKey: [INFINITE_SEARCH_PRODUCT, data],
    queryFn: ({ pageParam }) => {
      return getProductListBySearch({ ...data, cursor: pageParam });
    },
    enabled: flag,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
    gcTime: 0,
  });
