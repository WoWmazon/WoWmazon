import { useEffect, useState } from "react";
import { getExchangeLatest } from "@/api/exchange/apis";
import ProductCard from "../products/productCard";
import ProductCardSkeleton from "../skeletons/product-card-skeleton";
import SearchNoneProduct from "./search-none-product";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SearchResult = ({
  data,
  isLoading,
  isError,
  hasNextPage,
  fetchNextPage,
}: SearchResultProps) => {
  const observerRef = useIntersectionObserver({ fetchNextPage, hasNextPage });

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

  if (isError) {
    return <p>상품을 불러올 수 없습니다.</p>;
  }

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  if (data.length === 0) {
    return <SearchNoneProduct />;
  }

  return (
    <>
      {data
        .filter((product) => product.presentPrice !== null)
        .map((product: ProductResultType) => (
          <ProductCard
            key={product.id}
            product={product}
            exchangeRate={exchangeRate}
          />
        ))}
      {hasNextPage && (
        <div ref={observerRef}>
          <ProductCardSkeleton />
        </div>
      )}
    </>
  );
};

export default SearchResult;
