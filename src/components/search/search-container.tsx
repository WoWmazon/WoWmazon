"use client";

import { useInfiniteSearchProduct } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";
import { isUndefined } from "@/utils/type-guard";
import { useSearchParamsStore } from "@/stores/search/stores";

const SearchContainer = () => {
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  // react-query로 데이터 페칭
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteSearchProduct(searchParams);

  const getAllFetchResults = () => {
    const pages = data?.pages;
    if (!pages) {
      return { count: 0, cursor: "", results: [] };
    }
    const results = pages.flatMap((page) => page.results);

    return { count: pages[0].count, cursor: "", results };
  };

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchHeader />
      {(!isFetching && isUndefined(data)) || searchParams.search === "" ? (
        <RecentSearch />
      ) : (
        <SearchResult
          data={getAllFetchResults()}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
};

export default SearchContainer;
