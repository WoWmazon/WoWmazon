import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useInfiniteSearchProduct = (
  data: SearchParamsType,
  flag: boolean
) =>
  useInfiniteQuery({
    queryKey: ["infiniteSearchProduct", data],
    queryFn: ({ pageParam }) => {
      return getProductListBySearch({ ...data, cursor: pageParam });
    },
    enabled: flag,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
    gcTime: 0,
  });
