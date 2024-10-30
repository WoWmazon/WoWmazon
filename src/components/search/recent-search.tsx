import { useRecentSearchStore } from "@/stores/recent-search-store";
import RecentSearchItem from "./recent-search-item";
import CustomButton from "../common/custom-button";

const RecentSearch = () => {
  const recentSearch = useRecentSearchStore((state) => state.recentSearch);
  const clearRecentSearch = useRecentSearchStore(
    (state) => state.clearRecentSearch
  );

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex flex-row justify-between items-center h-11">
        <p className="font-bold">최근 검색어</p>
        {recentSearch.length ? (
          <CustomButton
            className="size-fit text-md hover:text-ELSE-55"
            variant="none"
            smallSize
            onClick={clearRecentSearch}
          >
            전체삭제
          </CustomButton>
        ) : (
          ""
        )}
      </div>
      {recentSearch.length ? (
        <div>
          {recentSearch.map((keyword, idx) => (
            <RecentSearchItem
              key={`rsk-${idx}`}
              keyword={keyword}
              onClick={() => console.log(keyword)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-56">
          <p>최근 검색어가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default RecentSearch;
