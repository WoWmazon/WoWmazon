import {
  getUserInfo,
  patchPushNotification,
  patchUserNickname,
  putAgreement,
} from "@/api/user/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_INFO = "userInfo";

export const useQueryUserInfo = () =>
  useQuery({
    queryKey: [USER_INFO],
    queryFn: () => getUserInfo("me"),
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
      console.error(error);
    },
  });
};

export const useMutationAgreement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (agreement: boolean) => putAgreement(agreement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_INFO] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useMutationPushNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isAlarm: boolean) => patchPushNotification(isAlarm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_INFO] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
