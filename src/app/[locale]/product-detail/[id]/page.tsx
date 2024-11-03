import ProductDetailHeader from "@/components/product-detail/product-detail-header";
import ProductDetailContent from "@/components/product-detail/product-detail-content";
// import ProductPriceGraph from "@/components/product-detail/product-price-graph";
import ProductPriceInfo from "@/components/product-detail/product-price-info";
import RelatedProduct from "@/components/product-detail/related-product";
import ProductDetailNav from "@/components/layout/product-detail-nav";
import { getProductDatail } from "@/api/product/apis";
import { headers } from "next/headers";

const page = async () => {
  const pathname = headers().get("original-pathname");
  const productId = pathname!.split("/").filter(Boolean)[1];

  const productInfo = await getProductDatail(productId);

  return (
    <div className="bg-ELSE-EC">
      <div className="mb-3">
        <ProductDetailHeader isFavorite={productInfo!.isFavorite} />
        <ProductDetailContent productId={productId} />
        {/* TODO: 그래프 추후 개발 */}
        {/* <ProductPriceGraph /> */}
        <ProductPriceInfo productId={productId} />
      </div>
      <div>
        <RelatedProduct productId={productId} />
      </div>
      <ProductDetailNav isFavorite={productInfo!.isFavorite} />
    </div>
  );
};
export default page;
