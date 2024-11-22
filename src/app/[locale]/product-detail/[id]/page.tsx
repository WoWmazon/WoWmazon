import ProductDetailHeader from "@/components/product-detail/product-detail-header";
import ProductDetailContent from "@/components/product-detail/product-detail-content";
// import ProductPriceGraph from "@/components/product-detail/product-price-graph";
import ProductPriceInfo from "@/components/product-detail/product-price-info";
import RelatedProduct from "@/components/product-detail/related-product";
import ProductDetailNav from "@/components/layout/product-detail-nav";
import { getProductDatail } from "@/api/product/apis";

const page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDatail(params.id);

  if (!product) return null;

  return (
    <div className="bg-ELSE-EC">
      <div className="mb-3">
        <ProductDetailHeader isFavorite={product!.isFavorite} />
        <ProductDetailContent {...product} />
        {/* TODO: 그래프 추후 개발 */}
        {/* <ProductPriceGraph /> */}
        <ProductPriceInfo productId={params.id} />
      </div>
      <div>
        <RelatedProduct productId={params.id} />
      </div>
      <ProductDetailNav {...product} />
    </div>
  );
};
export default page;
