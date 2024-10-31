"use client";

import { useEffect, useState } from "react";
import { useSearchProducts } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";
import { isUndefined } from "@/utils/type-guard";
import { useSearchParamsStore } from "@/stores/search-params-store";

const SearchContainer = () => {
  const [searchFlag, setSearchFlag] = useState(false);
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  // react-query로 데이터 페칭
  const { data, isLoading, isFetching, isFetched } = useSearchProducts(
    searchParams,
    searchFlag
  );

  useEffect(() => {
    if (isFetched) {
      setSearchFlag(false);
    }
  }, [isFetched]);

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchHeader setSearchFlag={setSearchFlag} />
      {/* 임시 처리 */}
      {(!isFetching && isUndefined(data)) || searchParams.search === "" ? (
        <RecentSearch setSearchFlag={setSearchFlag} />
      ) : (
        <SearchResult data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default SearchContainer;
