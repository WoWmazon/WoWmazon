type SearchFormType = {
  search: string;
  ordering: "present_price" | "-discount_rate";
  is_lowest_price_ever: boolean;
  is_out_of_stock: boolean;
};

type SearchResultProps = {
  data: ProductDataType;
  isLoading: boolean;
};
