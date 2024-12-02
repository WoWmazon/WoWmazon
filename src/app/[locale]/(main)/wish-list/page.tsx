import { getFavoriteProduct } from "@/api/favorite/apis";
import WishListContainer from "@/components/wish-list/wish-list-container";
import { WISH_LIST } from "@/constants/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const params: { ordering: "product_priority" } = {
  ordering: "product_priority",
};

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [WISH_LIST, params],
    queryFn: ({ pageParam = "" }) => {
      const queryParams: FavoriteProductParamsType = {
        ...params,
        cursor: pageParam,
      };
      return getFavoriteProduct(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage: GetFavoriteProductList) => {
      if (!lastPage || !lastPage.cursor) {
        return undefined;
      }
      return lastPage.cursor;
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <WishListContainer />
    </HydrationBoundary>
  );
};
export default page;
