type RecentSerchKeywordType = {
  id: string;
  keyword: string;
};

type TextButtonProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

type SearchFormType = {
  search: string;
  ordering: "present_price" | "discount_rate";
  is_lowest_price_ever: boolean;
  is_out_of_stock: boolean;
};
