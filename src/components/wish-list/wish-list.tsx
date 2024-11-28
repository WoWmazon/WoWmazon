"use client";

import { useWishEditStore } from "@/stores/prooduct/stores";
import ProductCard from "../products/productCard";
import WishListProductCard from "./wish-list-product-card";

const WishList = ({
  products,
  isFetchingNextPage,
  isLoading,
  isError,
  intersectionObserverRef,
}: WishListProps) => {
  const { isEditing, isChecked, setEdit, deleteEdit } = useWishEditStore();

  const handleCheckEditProduct = (id: number) => {
    if (isChecked(id)) {
      deleteEdit(id);
      return;
    }
    setEdit(id);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {products.length > 0 ? (
        products.map((product, index) => {
          const checked = isChecked(product.favoriteId);
          return (
            <WishListProductCard
              key={`${product.id}-${index}`}
              isEditing={isEditing}
              isChecked={checked}
              onCheck={() => handleCheckEditProduct(product.favoriteId)}
            >
              <ProductCard {...product} />
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
