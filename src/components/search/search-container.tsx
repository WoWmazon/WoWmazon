"use client";

import { useSearchProducts } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";

const SearchContainer = () => {
  // react-query로 데이터 페칭
  const { data, isLoading } = useSearchProducts({ search: "모니터" });

  return (
    <div className="px-4 pt-16 text-ELSE-33">
      <SearchHeader />
      {/* 미적용 */}
      {false ? (
        <RecentSearch />
      ) : (
        <SearchResult data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default SearchContainer;
