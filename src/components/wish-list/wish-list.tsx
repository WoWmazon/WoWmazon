"use client";

// import ProductCard from "../products/productCard";

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
  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} {...product} />
        ))
      ) : (
        <p>상품이 없습니다.</p>
      )} */}
      <div ref={intersectionObserverRef}>
        {isFetchingNextPage && <p>추가 데이터를 로딩 중...</p>}
      </div>
    </div>
  );
};
export default WishList;
