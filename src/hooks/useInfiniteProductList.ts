import { getProductList } from "@/api/product/apis";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteScrollQuery = () => {
  return useInfiniteQuery({
    queryKey: ["productList"],
    queryFn: ({ pageParam }) => getProductList(pageParam as number),
    getNextPageParam: (lastPage) => {
      const {
        meta: { currentPage, hasNextPage },
      };
    },
  });
};
