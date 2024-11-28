import {
  getFavoriteProduct,
  postFavoriteProduct,
  deleteFavoriteProduct,
  putFavoriteProduct,
} from "@/api/favorite/apis";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PRODUCT_DETAIL, WISH_LIST } from "@/constants/query-keys";
import { useToastStore } from "@/stores/common/stores";

export const useFavoriteProductList = (params: FavoriteProductParamsType) => {
  return useInfiniteQuery({
    queryKey: [WISH_LIST, params],
    queryFn: ({ pageParam = "" }) => {
      const queryParams: FavoriteProductParamsType = {
        ...params,
        cursor: pageParam,
      };
      return getFavoriteProduct(queryParams);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.cursor) {
        return undefined; // 추가 요청이 없음을 명시
      }
      return lastPage.cursor;
    },
  });
};

export const useSetFavoriteProduct = (queryKey?: string[]) => {
  const queryClient = useQueryClient();
  const { handleToast } = useToastStore();

  const { mutateAsync: addWishList } = useMutation({
    mutationFn: (id: number) => postFavoriteProduct(id),
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries({ queryKey });
      handleToast({
        open: true,
        onChange: () => handleToast({ open: false }),
        message: "찜하기 추가되었습니다",
      });
    },
    onError: (error) => {
      if (error) {
        handleToast({
          open: true,
          onChange: () => handleToast({ open: false }),
          message: "에러가 발생했습니다.",
        });
      }
    },
  });

  const { mutateAsync: deleteWishList } = useMutation({
    mutationFn: (id: number | number[]) => deleteFavoriteProduct(id),
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries({ queryKey });
      handleToast({
        open: true,
        onChange: () => handleToast({ open: false }),
        message: "찜하기 삭제되었습니다",
      });
    },
    onError: (error) => {
      if (error) {
        handleToast({
          open: true,
          onChange: () => handleToast({ open: false }),
          message: "에러가 발생했습니다.",
        });
      }
    },
  });

  return {
    addWishList,
    deleteWishList,
  };
};

export const useSetAlarm = (queryKey?: string[]) => {
  const queryClient = useQueryClient();
  const { handleToast } = useToastStore();

  const { mutate: editAlarm } = useMutation({
    mutationFn: ({ id, isAlarm }: { id: number; isAlarm: boolean }) =>
      putFavoriteProduct(id, isAlarm),
    onMutate: () => {
      const previousData = queryClient.getQueryData<FavoriteProductList>([
        PRODUCT_DETAIL,
      ]);

      const obj: FavoriteProductList | undefined = previousData && {
        ...previousData,
        isAlarm: !previousData.isAlarm,
      };

      if (previousData) {
        // 낙관적 업데이트
        queryClient.setQueryData<FavoriteProductList>([PRODUCT_DETAIL], obj);
      }
      return { previousData };
    },
    onSuccess: (data: FavoriteProductList | undefined) => {
      if (queryKey) queryClient.invalidateQueries({ queryKey });
      handleToast({
        open: true,
        onChange: () => handleToast({ open: false }),
        message: data?.isAlarm
          ? "알림이 설정되었습니다."
          : "알림이 해제되었습니다",
      });
    },
    onError: (error, params, context) => {
      if (error) {
        if (context) {
          queryClient.setQueryData([PRODUCT_DETAIL], context.previousData);
        }

        handleToast({
          open: true,
          onChange: () => handleToast({ open: false }),
          message: "에러가 발생했습니다.",
        });
      }
    },
  });

  return {
    editAlarm,
  };
};
