"use client";

import ProductCard from "@/components/products/productCard";
import ProductCardSkeleton from "../skeletons/product-card-skeleton";

const ProductList = ({
  products,
  isFetchingNextPage,
  isLoading,
  isError,
  productIntersectionObserverRef,
  exchangeRate,
}: {
  products: Array<productPostCardProps>;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  productIntersectionObserverRef: React.RefObject<HTMLDivElement>;
  exchangeRate: GetExchangeRateResponse;
}) => {
  if (!products) {
    return <p>상품없음</p>;
  }

  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {products.length > 0 ? (
        products
          .filter((product) => product.presentPrice !== null)
          .map((product, index) =>
            isLoading ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                exchangeRate={exchangeRate}
              />
            )
          )
      ) : (
        <p>상품이 없습니다.</p>
      )}
      <div ref={productIntersectionObserverRef}>
        {isFetchingNextPage && <p>추가 데이터를 로딩 중...</p>}
      </div>
    </div>
  );
};

export default ProductList;
