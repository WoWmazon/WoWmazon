import ProductCard from "../products/productCard";
import SearchFilter from "./search-filter";
import SearchNoneProduct from "./search-none-product";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SearchResult = ({
  data,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: SearchResultProps) => {
  const observerRef = useIntersectionObserver({ fetchNextPage, hasNextPage });

  return (
    <>
      <SearchFilter count={data?.count ?? 0} />
      {isLoading ? (
        <div>loading...</div>
      ) : data?.results?.length > 0 ? (
        <>
          {data.results.map((product: ProductResultType) => (
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
          {hasNextPage && <div ref={observerRef}>loading...</div>}
        </>
      ) : (
        <SearchNoneProduct />
      )}
    </>
  );
};

export default SearchResult;
