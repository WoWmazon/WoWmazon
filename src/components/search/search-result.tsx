import ProductCard from "../products/productCard";
import ProductCardSkelton from "../skeletons/product-card-skeleton";
import SearchNoneProduct from "./search-none-product";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SearchResult = ({
  data,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: SearchResultProps) => {
  const observerRef = useIntersectionObserver({ fetchNextPage, hasNextPage });

  if (isLoading) {
    return <ProductCardSkelton />;
  }

  if (data.length === 0) {
    return <SearchNoneProduct />;
  }

  return (
    <>
      {data.map((product: ProductResultType) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          presentPrice={product.presentPrice}
          price={product.price}
          discountRate={product.discountRate}
        />
      ))}
      {hasNextPage && (
        <div ref={observerRef}>
          <ProductCardSkelton />
        </div>
      )}
    </>
  );
};

export default SearchResult;
