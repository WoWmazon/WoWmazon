import { useQuery } from "@tanstack/react-query";
import { PRODUCT_DETAIL, RELATED_PRODUCT } from "@/constants/query-keys";
import { getProductDetail, getRelatedProductList } from "@/api/product/apis";

export const useProductDetail = (id: string) => {
  return useQuery<GetProductDetailResponse | undefined>({
    queryKey: [PRODUCT_DETAIL, id],
    queryFn: async () => await getProductDetail(id),
  });
};

export const useRelatedProduct = (id: string) => {
  return useQuery<ProductResultType[] | undefined>({
    queryKey: [RELATED_PRODUCT, id],
    queryFn: async () => await getRelatedProductList(id),
  });
};
