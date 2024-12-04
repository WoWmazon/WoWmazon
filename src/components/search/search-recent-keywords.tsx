import SearchRecentKeywordItem from "./search-recent-keyword-item";
import CustomButton from "../common/custom-button";
import {
  useRecentKeywordsStore,
  useProductParamsStore,
} from "@/stores/prooduct/stores";

const SearchRecentKeywordsContainer = () => {
  const { recentKeyword, clear: clearRecentSearch } = useRecentKeywordsStore();
  const setSearchParams = useProductParamsStore(
    (state) => state.setSearchParams
  );

  const handleClickRecentKeyword = (keyword: string) => {
    setSearchParams("search", keyword);
  };

  return (
    <div className="flex flex-col gap-2 mt-3 px-4">
      <div className="flex flex-row justify-between items-center h-11">
        <p className="font-bold">최근 검색어</p>
        {recentKeyword.length ? (
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
      {recentKeyword.length ? (
        <div>
          {recentKeyword.map((keyword, idx) => (
            <SearchRecentKeywordItem
              key={`rsk-${idx}`}
              keyword={keyword}
              onClick={() => handleClickRecentKeyword(keyword)}
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

export default SearchRecentKeywordsContainer;
