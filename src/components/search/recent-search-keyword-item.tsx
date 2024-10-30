"use client";

import DeleteButton from "@/assets/icons/input-delete-button.svg";
import IconButton from "../common/custom-icon-button";

const RecentSearchKeywordItem = ({ keyword }: { keyword: string }) => {
  return (
    <div className="flex flex-row justify-between items-center h-11">
      <div className="w-full select-none cursor-pointer">{keyword}</div>
      <IconButton icon={DeleteButton} alt="delete-btn" />
    </div>
  );
};
export default RecentSearchKeywordItem;
