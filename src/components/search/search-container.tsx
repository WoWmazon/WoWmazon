"use client";

import { useProductParamsStore } from "@/stores/prooduct/stores";
import { useInfiniteScrollProductList } from "@/hooks/useInfiniteProductList";
import SearchBar from "@/components/search/search-bar";
import SearchResult from "@/components/search/search-result";
import SearchRecentKeywords from "./search-recent-keywords";
import SearchFilter from "./search-filter";

const SearchContainer = () => {
  const searchParams = useProductParamsStore((state) => state.searchParams);
  const hasSearchKeyword = searchParams.search !== "";

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteScrollProductList(searchParams, hasSearchKeyword);

  const resultCount = data?.pages[0].count ?? 0;
  const resultData = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchBar />
      {!hasSearchKeyword ? (
        <SearchRecentKeywords />
      ) : (
        <>
          <SearchFilter count={resultCount} />
          <SearchResult
            data={resultData}
            isLoading={isPending}
            isError={isError}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </>
      )}
    </div>
  );
};

export default SearchContainer;
