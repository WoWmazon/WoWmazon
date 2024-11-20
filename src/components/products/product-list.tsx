"use client";

import ProductCard from "@/components/products/productCard";
import { useInfiniteScrollProductList } from "@/hooks/useInfiniteProductList";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ProductList = ({
  category_id,
  is_lowest_price_ever,
  is_out_of_stock,
  ordering,
  page_size,
  search,
}: ProductParamsType) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteScrollProductList({
    category_id: category_id,
    is_lowest_price_ever: is_lowest_price_ever,
    is_out_of_stock: is_out_of_stock,
    ordering: ordering,
    page_size: page_size,
    search: search,
  });
  const intersectionObserverRef = useIntersectionObserver({
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
  });
  if (!data) {
    return <p>상품없음</p>;
  }
  const allProducts = data.pages.flatMap((page) => page.results) || [];

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {allProducts.length > 0 ? (
        allProducts.map((product, index) => (
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
