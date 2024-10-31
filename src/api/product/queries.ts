import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useInfiniteSearchProject = (
  data: ProductParamsType,
  flag: boolean
) =>
  useInfiniteQuery({
    queryKey: ["infiniteSearchProduct", data],
    queryFn: ({ pageParam }) => {
      const params = { ...data };
      if (pageParam !== "") {
        params.cursor = pageParam;
      }
      return getProductListBySearch(params);
    },
    enabled: flag,
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
  });
