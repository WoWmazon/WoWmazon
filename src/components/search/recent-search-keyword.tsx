import CustomButton from "../common/custom-button";
import RecentSearchKeywordItem from "./recent-search-keyword-item";

const RecentSearchKeyword = ({
  keywords,
}: {
  keywords: { id: string; keyword: string }[];
}) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex flex-row justify-between items-center h-11">
        <p className="font-bold">최근 검색어</p>
        {keywords.length ? (
          <CustomButton className="w-fit text-md" variant="none" smallSize>
            전체삭제
          </CustomButton>
        ) : (
          ""
        )}
      </div>
      {keywords.length ? (
        <div>
          {keywords.map(({ id, keyword }) => (
            <RecentSearchKeywordItem key={id} keyword={keyword} />
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

export default RecentSearchKeyword;
