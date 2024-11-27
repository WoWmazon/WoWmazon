"use client";

import { isNull, isUndefined } from "@/utils/type-guard";
import RelatedProductCard from "./related-product-card";
import { useRelatedProduct } from "@/hooks/useProductDetail";

const RelatedProduct = ({
  productId,
  exchangeData,
}: {
  productId: string;
  exchangeData: GetExchangeResponse;
}) => {
  const { data: relatedProducts } = useRelatedProduct(productId);

  if (isNull(relatedProducts) || isUndefined(relatedProducts)) {
    console.log("관련된 상품 데이터가 비어있습니다.");
    return null;
  }

  return (
    <div className="bg-SYSTEM-white">
      <div className="px-4 py-[30px]">
        <p className="font-bold mb-3">해당 상품과 비슷한 상품</p>
        <div className="w-full flex gap-3 overflow-x-auto">
          {relatedProducts.map(
            (item) =>
              exchangeData && (
                <RelatedProductCard
                  key={item.id}
                  relatedProduct={item}
                  exchangeData={exchangeData}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default RelatedProduct;
