import { getProductDetail } from "@/api/product/apis";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PRODUCT_DETAIL } from "@/constants/query-keys";
import ProductDetailContainer from "@/components/product-detail/product-detail-container";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProductDetail(params.id);

    return {
      title: `${product?.title} - | Wowmazon`,
      openGraph: {
        title: `${product?.title} - | Wowmazon`,
        url: `https://wowmazon.vercel.app/product-detail/${params.id}`,
        images: [
          {
            url:
              product?.image ||
              "https://wowmazon.vercel.app/images/noImage.svg",
            alt: product?.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Failed to fetch product metadata", error);
  }
}

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
