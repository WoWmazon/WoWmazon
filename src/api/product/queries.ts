import { useQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";
import { isUndefined } from "@/utils/type-guard";

export const useSearchProducts = (data: ProductParamsType) =>
  useQuery({
    queryKey: ["searchProduct", data],
    queryFn: () => getProductListBySearch(data),
    enabled: !isUndefined(data?.search) && data.search !== "",
  });
