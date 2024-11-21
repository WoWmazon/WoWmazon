"use client";

import { useInfiniteSearchProduct } from "@/api/product/queries";
import SearchBar from "@/components/search/search-bar";
import SearchResult from "@/components/search/search-result";
import SearchRecentKeywords from "./search-recent-keywords";
import SearchFilter from "./search-filter";
import { useSearchParamsStore } from "@/stores/prooduct/stores";

const SearchContainer = () => {
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  // react-query로 데이터 페칭
  const { data, isPending, hasNextPage, fetchNextPage } =
    useInfiniteSearchProduct(searchParams);

  const resultCount = data?.pages[0].count ?? 0;
  const resultData = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchBar />
      {searchParams.search === "" ? (
        <SearchRecentKeywords />
      ) : (
        <>
          <SearchFilter count={resultCount} />
          <SearchResult
            data={resultData}
            isLoading={isPending}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </>
      )}
    </div>
  );
};

export default SearchContainer;
