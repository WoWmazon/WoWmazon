import { useQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useSearchProducts = (data: ProductParamsType) =>
  useQuery({
    queryKey: ["searchProduct", data],
    queryFn: () => getProductListBySearch(data),
    enabled: false,
  });
