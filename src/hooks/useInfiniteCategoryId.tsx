import { getCategoryId } from "@/api/product/apis";
import { INFINITE_CATEGORY } from "@/constants/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCategory = () => {
  return useInfiniteQuery({
    queryKey: [INFINITE_CATEGORY],
    queryFn: ({ pageParam = "" }) => {
      const params: ProductCategoryParamsType = pageParam
        ? { cursor: pageParam }
        : {};
      return getCategoryId(params);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
  });
};
