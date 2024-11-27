import DeleteButton from "@/assets/icons/input-delete-button.svg";
import IconButton from "../common/custom-icon-button";
import { useRecentKeywordsStore } from "@/stores/prooduct/stores";

const SearchRecentKeywordItem = ({
  keyword,
  onClick,
}: SearchRecentKeywordItemProps) => {
  const deleteRecentKeyword = useRecentKeywordsStore((state) => state.delete);

  return (
    <div className="flex flex-row justify-between items-center h-11 cursor-pointer -mx-4 px-4 hover:bg-ELSE-F5">
      <div className="w-full select-none" onClick={onClick}>
        {keyword}
      </div>
      <IconButton
        className="size-5 justify-items-center rounded-full hover:bg-ELSE-FA"
        icon={DeleteButton}
        alt="delete-btn"
        size={10}
        onClick={() => deleteRecentKeyword(keyword)}
      />
    </div>
  );
};
export default SearchRecentKeywordItem;
