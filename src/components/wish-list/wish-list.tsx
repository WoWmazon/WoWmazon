"use client";

import { useEffect, useState } from "react";
import ProductCard from "../products/productCard";
import { getExchangeLatest } from "@/api/exchange/apis";
import WishListProductCard from "./wish-list-product-card";
import { useWishEditStore } from "@/stores/prooduct/stores";

const WishList = ({
  products,
  isFetchingNextPage,
  isLoading,
  isError,
  intersectionObserverRef,
}: WishListProps) => {
  const [exchangeRate, setExchangeRate] = useState<GetExchangeRateResponse>({
    usdToKrw: 1350,
    createdAt: new Date("2024-11-28T10:42:54.451916+09:00"),
  });
  const { isEditing, isChecked, setEdit, deleteEdit } = useWishEditStore();

  const handleCheckEditProduct = (id: number) => {
    if (isChecked(id)) {
      deleteEdit(id);
      return;
    }
    setEdit(id);
  };

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
          .map((product, index) => {
            const checked = isChecked(product.favoriteId);
            return (
              <WishListProductCard
                key={`${product.id}-${index}`}
                isEditing={isEditing}
                isChecked={checked}
                onCheck={() => handleCheckEditProduct(product.favoriteId)}
              >
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  exchangeRate={exchangeRate}
                />
              </WishListProductCard>
            );
          })
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
