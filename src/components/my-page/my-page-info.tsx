"use client";

import Image from "next/image";
import { useBottomSheetStore } from "@/stores/common/stores";
import BottomSheet from "@/components/common/bottom-sheet";
import NicknameEditForm from "./nickname-edit-form";

import Rename from "@/assets/icons/mypage_rename.svg";
import { useMutaionUserInfo, useQueryUserInfo } from "@/hooks/useUserQuery";

const MyPageInfo = () => {
  const { data } = useQueryUserInfo();
  const { mutate } = useMutaionUserInfo();
  const { handleBottomSheet } = useBottomSheetStore();

  const setNicknameBottomSheet = () => {
    handleBottomSheet({
      children: <NicknameEditForm nickname={data?.nickname} />,
      isShow: true,
      hasDelBtn: true,
      handleClose: () => handleBottomSheet({ isShow: false }),
      title: "닉네임 변경하기",
      btnText: "완료",
      handleAction: () => {
        mutate({ nickname: "newJeans1" });
        handleBottomSheet({ isShow: false });
      },
    });
  };

  return (
    <div className="py-5 px-4">
      <div className="flex flex-row gap-[6px]">
        <p className="text-xl font-bold">안녕하세요, {data?.nickname}님</p>
        <Image
          className="cursor-pointer hover:scale-110"
          src={Rename}
          alt="mypage-rename"
          width={24}
          height={24}
          onClick={setNicknameBottomSheet}
        />
      </div>
      <BottomSheet />
    </div>
  );
};
export default MyPageInfo;
