"use client";

import ProductDetailHeader from "./product-detail-header";
import ProductDetailContent from "./product-detail-content";
// import ProductPriceGraph from "@/components/product-detail/product-price-graph";
import ProductPriceInfo from "./product-price-info";
import RelatedProduct from "./related-product";
import ProductDetailNav from "../layout/product-detail-nav";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useEffect, useState } from "react";
import { getExchangeLatest } from "@/api/exchange/apis";
import { isNull, isUndefined } from "@/utils/type-guard";
import ProductDetailContentSkeleton from "../skeletons/product-detail-content-skeleton";

const ProductDetailContainer = ({ params }: { params: { id: string } }) => {
  const { data: product, isLoading } = useProductDetail(params.id);

  const [exchangeRate, setExchangeRate] = useState<GetExchangeRateResponse>({
    usdToKrw: 1350,
    createdAt: new Date("2024-11-28T10:42:54.451916+09:00"),
  });

  useEffect(() => {
    const getExchange = async () => {
      const result = await getExchangeLatest();
      setExchangeRate(result);
    };
    getExchange();
  }, []);

  if (isNull(product) || isUndefined(product)) {
    return null;
  }

  return (
    <>
      <div className="mb-3">
        <ProductDetailHeader {...product} />
        {isLoading ? (
          <ProductDetailContentSkeleton />
        ) : (
          <ProductDetailContent product={product} exchangeRate={exchangeRate} />
        )}
        {/* TODO: 그래프 추후 개발 */}
        {/* <ProductPriceGraph /> */}
        <ProductPriceInfo productId={params.id} exchangeRate={exchangeRate} />
      </div>
      <div>
        <RelatedProduct productId={params.id} exchangeRate={exchangeRate} />
      </div>
      <ProductDetailNav {...product} />
    </>
  );
};
export default ProductDetailContainer;
