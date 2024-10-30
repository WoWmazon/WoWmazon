type SearchResultProps = {
  data: ProductDataType;
  isLoading: boolean;
};

type RecentSearchItemProps = {
  keyword: string;
  onClick: () => void;
};
