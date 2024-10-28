"use client";

import { getRelatedProductList } from "@/api/product/apis";
import { useEffect, useState } from "react";

// API : 관련 product 목록 조회 GET _ /v1/product/{id}/related_product_list
// 비슷한 상품 구현 필요
const RelatedProduct = () => {
  const [relatedProducts, setRelatedProducts] =
    useState<getRelatedProductListResponse[]>();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const data = await getRelatedProductList("127184");
        setRelatedProducts(data);
      } catch (error) {
        console.log("에러 : ", error);
      }
    };
    fetchRelatedProducts();
  }, []);

  return (
    <div className="bg-SYSTEM-white">
      <div className="px-4 py-[30px]">
        <p className="font-bold mb-2">해당 상품과 비슷한 상품</p>
        <pre>{JSON.stringify(relatedProducts, null, 2)}</pre>
      </div>
    </div>
  );
};
export default RelatedProduct;
