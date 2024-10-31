"use server";

import { getProductList } from "@/api/product/apis";
import ProductList from "@/components/products/product-List";
import ProductListHeader from "@/components/products/product-list-header";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

// 페이지 컴포넌트 정의
const page = async (data: ProductParamsType) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["productList", data],
    queryFn: async ({ pageParam = "" }) => {
      // pageParam을 cursor로 사용하여 getProductList 호출
      return await getProductList({
        ...data,
        cursor: pageParam,
      });
    },
    initialPageParam: "", // 초기 pageParam을 빈 문자열로 설정하여 첫 호출에 빈 cursor 사용
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductListHeader />
      <ProductList />
    </HydrationBoundary>
  );
};

export default page;
