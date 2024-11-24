import { useEffect, useState } from "react";
import Image from "next/image";
import { useSimpleBottomSheetStore } from "@/stores/common/stores";
import SimpleBottomSheet from "@/components/common/simple-bottom-sheet";
import NicknameEditForm from "./nickname-edit-form";

import Rename from "@/assets/icons/mypage_rename.svg";

const MyPageInfo = ({ nickname }: { nickname: string }) => {
  const [editFormNickname, setEditFormNickname] = useState("");
  const { handleSimpleBottomSheet } = useSimpleBottomSheetStore();

  const setNicknameBottomSheet = () => {
    handleSimpleBottomSheet({
      children: (
        <NicknameEditForm
          nickname={editFormNickname}
          onClose={() => handleSimpleBottomSheet({ isShow: false })}
        />
      ),
      isShow: true,
      handleClose: () => handleSimpleBottomSheet({ isShow: false }),
    });
  };

  useEffect(() => {
    setEditFormNickname(nickname);
  }, [nickname]);

  return (
    <div className="py-5 px-4">
      <div className="flex flex-row gap-[6px]">
        <p className="text-xl font-bold">안녕하세요, {nickname}님</p>
        <Image
          className="cursor-pointer hover:scale-110"
          src={Rename}
          alt="mypage-rename"
          width={24}
          height={30}
          onClick={setNicknameBottomSheet}
        />
      </div>
      <SimpleBottomSheet />
    </div>
  );
};
export default MyPageInfo;
