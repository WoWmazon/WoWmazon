import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  patchPushNotification,
  patchUserNickname,
  postUserWithdrawal,
  putAgreement,
} from "@/api/user/apis";

export const USER_INFO = "userInfo";

export const useQueryUserInfo = () =>
  useQuery({
    queryKey: [USER_INFO],
    queryFn: () => getUserInfo("me"),
  });

export const useMutationUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchUserNickname,
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
    mutationFn: putAgreement,
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
    mutationFn: patchPushNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_INFO] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useMutationWithdrawal = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postUserWithdrawal,
    onSuccess: () => {
      alert("탈퇴되었습니다.");
      router.push("/");
    },
    onError: (e) => {
      console.error(e);
      alert("오류가 발생했습니다.");
    },
  });
};
