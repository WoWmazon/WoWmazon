"use clinet";

import RecentSearchKeyword from "@/components/search/recent-search-keyword";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";

const SearchContainer = () => {
  // 예시
  const keywords = [
    { id: "1", keyword: "우유" },
    { id: "2", keyword: "모니터" },
  ];

  return (
    <div className="px-4 text-ELSE-33">
      <SearchHeader />
      <RecentSearchKeyword keywords={keywords} />
      {/* <SearchResult /> */}
    </div>
  );
};
export default SearchContainer;
