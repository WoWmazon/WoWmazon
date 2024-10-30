type SearchResultProps = {
  data: ProductDataType;
  isLoading: boolean;
};

type RecentSearchItemProps = {
  search: string;
  onClick: () => void;
};
