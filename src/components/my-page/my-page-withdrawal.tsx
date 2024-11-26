"use client";

import { useModalStore } from "@/stores/common/stores";
import CustomButton from "../common/custom-button";
import Modal from "../common/modal";
import { useMutationWithdrawal } from "@/hooks/useUserQuery";

const MyPageWithdrawal = () => {
  const { handleModal, handleClose } = useModalStore();
  const { mutate } = useMutationWithdrawal();
  const handleCloseModal = () => {
    handleModal({
      isShow: true,
      title: "정말 회원탈퇴 하시겠어요?",
      content:
        "탈퇴하시면 찜한 상품, 언어 설정, 가격 할인 설정 등 모든 정보가 삭제되며 복구가 불가능해요.",
      btnText: "탈퇴할래요",
      handleAction: () => {
        mutate();
        handleClose();
      },
      optionalBtnText: "유지할래요",
      handleOptional: handleClose,
    });
  };
  return (
    <>
      <div className="h-2 bg-ELSE-FA" />
      <div className="p-4">
        <CustomButton
          className="size-fit text-md text-ELSE-AE ml-auto"
          variant="none"
          smallSize
          onClick={handleCloseModal}
        >
          회원탈퇴
        </CustomButton>
      </div>
      <Modal />
    </>
  );
};
export default MyPageWithdrawal;
