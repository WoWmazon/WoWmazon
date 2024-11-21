type SearchResultProps = {
  data: ProductResultType[];
  isLoading: boolean;
  isError: boolean;
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
