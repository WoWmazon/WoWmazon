import { getProductList } from "@/api/product/apis";
import ProductListCategoryFilter from "@/components/products/product-list-category-filter";
import ProductListHeader from "@/components/products/product-list-header";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PRODUCT_LIST } from "@/constants/query-keys";
import { getExchangeLatest } from "@/api/exchange/apis";

const queryParams = { ordering: "-discount_rate" };

const page = async () => {
  const exchangeRate = await getExchangeLatest();
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [PRODUCT_LIST, queryParams],
    queryFn: async ({ pageParam = "" }) => {
      const queryParams: ProductParamsType = {
        cursor: pageParam,
        ordering: "-discount_rate",
      };
      return await getProductList(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage: GetProductListResponse) => {
      if (!lastPage || !lastPage.cursor) {
        return undefined;
      }
      return lastPage.cursor;
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductListHeader exchangeRate={exchangeRate}/>
      <ProductListCategoryFilter exchangeRate={exchangeRate}/>
    </HydrationBoundary>
  );
};

export default page;
