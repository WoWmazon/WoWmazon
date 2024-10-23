import ProductDetailContent from "@/components/product-detail/product-detail-content";
import ProductDetailHeader from "@/components/product-detail/product-detail-header";
import RelatedProduct from "@/components/product-detail/related-product";

const page = () => {
  return (
    <div className="bg-ELSE-EC">
      <div className="mb-3">
        <ProductDetailHeader />
        <ProductDetailContent />
      </div>
      <div>
        <RelatedProduct />
      </div>
    </div>
  );
};
export default page;
