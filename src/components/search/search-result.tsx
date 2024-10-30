import SearchFilter from "./search-filter";
import SearchNoneProduct from "./search-none-product";

const SearchResult = ({
  data,
  isLoading,
}: {
  data: ProductResultType[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <SearchFilter />
      {isLoading ? (
        <div>loading...</div>
      ) : data?.length ? (
        <div>
          {data.map((d) => (
            <div key={d.id}>{d.title}</div>
          ))}
        </div>
      ) : (
        <SearchNoneProduct />
      )}
    </div>
  );
};

export default SearchResult;
