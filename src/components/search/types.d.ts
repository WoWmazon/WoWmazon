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

type SearchRecentKeywordItemProps = {
  keyword: string;
  onClick: () => void;
};
