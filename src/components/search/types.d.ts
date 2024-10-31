type SearchResultProps = {
  data: ProductDataType;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetProductListResponse, unknown>,
      Error
    >
  >;
};

type RecentSearchItemProps = {
  search: string;
  onClick: () => void;
};
