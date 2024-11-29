import { useRecentKeywordsStore } from "@/stores/prooduct/stores";
import IconButton from "../common/custom-icon-button";
import DeleteButton from "@/assets/icons/input-delete-button.svg";

const SearchRecentKeywordItem = ({
  keyword,
  onClick,
}: SearchRecentKeywordItemProps) => {
  const deleteRecentKeyword = useRecentKeywordsStore((state) => state.delete);
  const handleDeleteKeyword = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteRecentKeyword(keyword);
  };

  return (
    <div
      className="flex flex-row justify-between items-center h-11 cursor-pointer -mx-4 px-4 hover:bg-ELSE-F5"
      onClick={onClick}
    >
      <div className="w-full select-none">{keyword}</div>
      <IconButton
        className="size-5 justify-items-center rounded-full hover:bg-ELSE-FA"
        icon={DeleteButton}
        alt="delete-btn"
        size={10}
        onClick={handleDeleteKeyword}
      />
    </div>
  );
};
export default SearchRecentKeywordItem;
