import {
  getUserInfo,
  patchPushNotification,
  patchUserNickname,
  postUserWithdrawal,
  putAgreement,
} from "@/api/user/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_INFO = "userInfo";

export const useQueryUserInfo = (id: string) =>
  useQuery({
    queryKey: [USER_INFO],
    queryFn: () => getUserInfo(id),
  });

export const useMutationUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, info }: MutationUserInfoType) =>
      patchUserNickname(id, info),
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
    mutationFn: ({ id, agreement }: MutationAgreementType) =>
      putAgreement(id, agreement),
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
    mutationFn: ({ id, isAlarm }: MutationPushNotificationType) =>
      patchPushNotification(id, isAlarm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_INFO] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
