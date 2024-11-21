import DeleteButton from "@/assets/icons/input-delete-button.svg";
import IconButton from "../common/custom-icon-button";
import { useRecentKeywordsStore } from "@/stores/prooduct/stores";

const SearchRecentKeywordItem = ({
  keyword,
  onClick,
}: SearchRecentKeywordItemProps) => {
  const deleteRecentKeyword = useRecentKeywordsStore((state) => state.delete);

  return (
    <div className="flex flex-row justify-between items-center h-11">
      <div className="w-full select-none cursor-pointer" onClick={onClick}>
        {keyword}
      </div>
      <IconButton
        icon={DeleteButton}
        alt="delete-btn"
        onClick={() => deleteRecentKeyword(keyword)}
      />
    </div>
  );
};
export default SearchRecentKeywordItem;
