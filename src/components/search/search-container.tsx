"use client";

import { useEffect } from "react";
import { useInfiniteSearchProduct } from "@/api/product/queries";
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
    useInfiniteSearchProduct(searchParams, searchFlag);

  const getAllFetchResults = () => {
    const pages = data?.pages;
    if (!pages) {
      return { count: 0, cursor: "", results: [] };
    }
    const results = pages.flatMap((page) => page.results);

    return { count: pages[0].count, cursor: "", results };
  };

  useEffect(() => {
    if (isFetched) {
      setSearchFlag(false);
    }
  }, [isFetched, setSearchFlag]);

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
