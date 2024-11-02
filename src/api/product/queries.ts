import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useInfiniteSearchProject = (
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
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    gcTime: 0,
  });
