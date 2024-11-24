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
import { WISH_LIST } from "@/constants/query-keys";
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
    mutationFn: ( id : number ) => postFavoriteProduct(id),
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
    mutationFn: ({ id }: { id: number }) => deleteFavoriteProduct(id),
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries({ queryKey: ["WISH_LIST"] });
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

  const { mutate: editAlarm } = useMutation({
    mutationFn: ({ id, isAlarm }: { id: number; isAlarm: boolean }) =>
      putFavoriteProduct(id, isAlarm),
    onMutate: (newData) => {
      const previousData = queryClient.getQueryData<FavoriteProductList>([
        "WISH_LIST",
      ]);

      const obj: FavoriteProductList | undefined = previousData && {
        ...previousData,
        isAlarm: !previousData.isAlarm,
      };

      if (previousData) {
        // 낙관적 업데이트
        queryClient.setQueryData<FavoriteProductList>(["WISH_LIST"], obj);
      }
      return { previousData };
    },
    onSuccess: (data: FavoriteProductList | undefined, newData) => {
      queryClient.invalidateQueries({ queryKey: ["WISH_LIST"] });
      handleToast({
        open: true,
        onChange: () => handleToast({ open: false }),
        message: data?.isAlarm
          ? "찜하기 추가되었습니다."
          : "찜하기 삭제되었습니다",
      });
    },
    onError: (error, newData, context) => {
      if (error) {
        if (context) {
          queryClient.setQueryData(["WISH_LIST"], context.previousData);
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
    addWishList,
    deleteWishList,
    editAlarm,
  };
};
