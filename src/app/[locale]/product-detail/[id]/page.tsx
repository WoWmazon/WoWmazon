import ProductDetailHeader from "@/components/product-detail/product-detail-header";
import ProductDetailContent from "@/components/product-detail/product-detail-content";
// import ProductPriceGraph from "@/components/product-detail/product-price-graph";
import ProductPriceInfo from "@/components/product-detail/product-price-info";
import RelatedProduct from "@/components/product-detail/related-product";

const page = () => {
  return (
    <div className="bg-ELSE-EC">
      <div className="mb-3">
        <ProductDetailHeader />
        <ProductDetailContent />
        {/* TODO: 그래프 추후 개발 */}
        {/* <ProductPriceGraph /> */}
        <ProductPriceInfo />
      </div>
      <div>
        <RelatedProduct />
      </div>
    </div>
  );
};
export default page;
