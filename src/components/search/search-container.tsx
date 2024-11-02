"use client";

import { useEffect } from "react";
import { useInfiniteSearchProject } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";
import { isUndefined } from "@/utils/type-guard";
import {
  useSearchFlagStore,
  useSearchParamsStore,
} from "@/stores/search/stores";

const SearchContainer = () => {
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  const { searchFlag, setSearchFlag } = useSearchFlagStore();
  // react-query로 데이터 페칭
  const { data, isLoading, isFetching, isFetched, hasNextPage, fetchNextPage } =
    useInfiniteSearchProject(searchParams, searchFlag);

  const getAllFetchResults = () => {
    const pages = data?.pages;
    if (!pages) {
      return [];
    }
    const results: ProductResultType[] = [];
    pages.forEach((page) => {
      results.push(...page.results);
    });

    return { count: pages[0].count, cursor: "", results };
  };

  useEffect(() => {
    if (isFetched) {
      setSearchFlag(false);
    }
  }, [isFetched]);

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
