"use client";

import { useEffect, useState } from "react";
import ProductDetailHeader from "./product-detail-header";
import ProductDetailContent from "./product-detail-content";
// import ProductPriceGraph from "@/components/product-detail/product-price-graph";
import ProductPriceInfo from "./product-price-info";
import RelatedProduct from "./related-product";
import ProductDetailNav from "../layout/product-detail-nav";
import { useProductDetail } from "@/hooks/useProductDetail";
import { getExchangeLatest } from "@/api/exchange/apis";

const ProductDetailContainer = ({ params }: { params: { id: string } }) => {
  const { data: product } = useProductDetail(params.id);

  const [exchangeData, setExchangeData] = useState<GetExchangeResponse>();

  useEffect(() => {
    const getExchange = async () => {
      const result = await getExchangeLatest();
      setExchangeData(result);
    };
    getExchange();
  }, []);

  if (!product) return null;
  if (!exchangeData) return null;
  return (
    <>
      <div className="mb-3">
        <ProductDetailHeader {...product} />
        <ProductDetailContent product={product} exchangeData={exchangeData} />
        {/* TODO: 그래프 추후 개발 */}
        {/* <ProductPriceGraph /> */}
        <ProductPriceInfo productId={params.id} exchangeData={exchangeData} />
      </div>
      <div>
        <RelatedProduct productId={params.id} exchangeData={exchangeData} />
      </div>
      <ProductDetailNav {...product} />
    </>
  );
};
export default ProductDetailContainer;
