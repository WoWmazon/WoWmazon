import ProductCard from "../products/productCard";
import SearchFilter from "./search-filter";
import SearchNoneProduct from "./search-none-product";

const SearchResult = ({ data, isLoading }: SearchResultProps) => {
  return (
    <>
      <SearchFilter count={data?.count ?? 0} />
      {isLoading ? (
        <div>loading...</div>
      ) : data?.results?.length > 0 ? (
        data.results.map((product: ProductResultType) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            presentPrice={product.presentPrice}
            price={product.price}
            discountRate={product.discountRate}
          />
        ))
      ) : (
        <SearchNoneProduct />
      )}
    </>
  );
};

export default SearchResult;
