"use server";

import { getProductList } from "@/api/product/apis";
import ProductListCategoryFilter from "@/components/products/product-list-category-filter";
import ProductListHeader from "@/components/products/product-list-header";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const page = async () => {
  const queryClient = new QueryClient();
  //수정 필요, 동작 안하고있음
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["productList"],
    queryFn: async ({ pageParam = "" }) => {
      return await getProductList({
        cursor: pageParam,
      });
    },
    initialPageParam: "",
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductListHeader />
      <ProductListCategoryFilter />
    </HydrationBoundary>
  );
};

export default page;
