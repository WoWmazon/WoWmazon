"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/productCard";
import { useInfiniteScrollProductList } from "@/hooks/useInfiniteProductList";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ProductList = () => {
  const [products, setProducts] = useState<ProductResultType[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteScrollProductList();

  //스크롤 이벤트 핸들러
  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.results);
      setProducts(allProducts);
    }
  }, [data]);

  const intersectionObserverRef = useIntersectionObserver({
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} {...product} />
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

export default ProductList;
