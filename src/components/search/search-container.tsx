"use client";

import { useEffect, useState } from "react";
import { useSearchProducts } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";
import { isUndefined } from "@/utils/type-guard";
import { useSearchParamsStore } from "@/stores/search-params-store";

const SearchContainer = () => {
  const [isRecentClick, setIsRecentClick] = useState(false);
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  // react-query로 데이터 페칭
  const { data, isLoading, isFetching, refetch } =
    useSearchProducts(searchParams);

  useEffect(() => {
    if (isRecentClick) {
      refetch();
    }
    return () => setIsRecentClick(false);
  }, [isRecentClick]);

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchHeader />
      {/* 임시 처리 */}
      {(!isFetching && isUndefined(data)) || searchParams.search === "" ? (
        <RecentSearch setIsClick={setIsRecentClick} />
      ) : (
        <SearchResult data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default SearchContainer;
