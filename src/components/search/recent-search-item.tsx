import DeleteButton from "@/assets/icons/input-delete-button.svg";
import IconButton from "../common/custom-icon-button";
import { useRecentSearchStore } from "@/stores/recent-search-store";

const RecentSearchItem = ({ search, onClick }: RecentSearchItemProps) => {
  const deleteRecentSearch = useRecentSearchStore(
    (state) => state.deleteRecentSearch
  );

  return (
    <div className="flex flex-row justify-between items-center h-11">
      <div className="w-full select-none cursor-pointer" onClick={onClick}>
        {search}
      </div>
      <IconButton
        icon={DeleteButton}
        alt="delete-btn"
        onClick={() => deleteRecentSearch(search)}
      />
    </div>
  );
};
export default RecentSearchItem;
