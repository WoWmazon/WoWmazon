type SearchResultProps = {
  data: ProductDataType;
  isLoading: boolean;
};
type RecentSerchKeywordType = {
  id: string;
  keyword: string;
};

type TextButtonProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

type RecentSearchItemProps = {
  keyword: string;
  onClick: () => void;
};
