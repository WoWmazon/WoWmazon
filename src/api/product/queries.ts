import { useQuery } from "@tanstack/react-query";
import { getProductListBySearch } from "./apis";

export const useProducts = (data: ProductParamsType) =>
  useQuery({
    queryKey: ["products", data],
    queryFn: () => {
      if (!data.search) {
        return [];
      }
      return getProductListBySearch(data);
    },
  });
