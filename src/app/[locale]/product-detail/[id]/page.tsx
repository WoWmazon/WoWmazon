import { getProductDetail } from "@/api/product/apis";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PRODUCT_DETAIL } from "@/constants/query-keys";
import ProductDetailContainer from "@/components/product-detail/product-detail-container";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [PRODUCT_DETAIL, params.id],
    queryFn: () => getProductDetail(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-ELSE-EC">
        <ProductDetailContainer params={params} />
      </div>
    </HydrationBoundary>
  );
};
export default page;
