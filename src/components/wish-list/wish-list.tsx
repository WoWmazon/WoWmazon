"use client";

import { useEffect, useState } from "react";
import ProductCard from "../products/productCard";
import { getExchangeLatest } from "@/api/exchange/apis";

const WishList = ({
  products,
  isFetchingNextPage,
  isLoading,
  isError,
  intersectionObserverRef,
}: {
  products: Array<WishProductCardProps>;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  intersectionObserverRef: React.RefObject<HTMLDivElement>;
}) => {
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

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {products.length > 0 ? (
        products
          .filter((product) => product.presentPrice !== null)
          .map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              exchangeRate={exchangeRate}
            />
          ))
      ) : (
        <p>상품이 없습니다.</p>
      )}
      <div ref={intersectionObserverRef}>
        {isFetchingNextPage && <p>추가 데이터를 로딩 중...</p>}
      </div>
    </div>
  );
};
export default WishList;
