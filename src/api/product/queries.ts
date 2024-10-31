import { useQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useSearchProducts = (data: ProductParamsType, flag: boolean) =>
  useQuery({
    queryKey: ["searchProduct", data],
    queryFn: () => getProductListBySearch(data),
    enabled: flag,
    gcTime: 0,
  });
