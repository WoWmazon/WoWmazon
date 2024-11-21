import { getUserInfo, patchUserNickname } from "@/api/user/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_INFO = "userInfo";

export const useQueryUserInfo = () =>
  useQuery({
    queryKey: [USER_INFO],
    queryFn: getUserInfo,
  });

export const useMutaionUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info: { nickname?: string; lang?: string }) =>
      patchUserNickname(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_INFO] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
