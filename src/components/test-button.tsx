"use client";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { LocaleTypes } from "../utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import Modal from "./common/modal";
import wifiSlashIcon from "../../src/assets/icons/wifiSlash.svg";
import BottomSheet from "./common/bottom-sheet";
import SimpleBottomSheet from "./common/simple-bottom-sheet";
import CustomInput from "./common/custom-input";
import CustomButton from "./common/custom-button";
import {
  useModalStore,
  useSimpleBottomSheetStore,
  useBottomSheetStore,
} from "@/stores/common";
import Toast from "./common/toast";

const TestButton = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const { handleModal } = useModalStore();
  const { handleSimpleBottomSheet } = useSimpleBottomSheetStore();
  const { handleBottomSheet } = useBottomSheetStore();

  const [isWished, setIsWished] = useState(false);
  const inputRef = useRef(""); // 최신 값을 담기 위한 ref

  const handleNetworkModal = () => {
    handleModal({
      isShow: true,
      handleClose: () => handleModal({ isShow: false }),
      title: "네트워크 연결상태가 불안정해요",
      content:
        "네트워크 연결상태를 확인하거나 아래 버튼 클릭후 다시 접속을 시도해주시기 바랍니다",
      btnText: "재시도",
      handleAction: () => {
        handleModal({ isShow: false });
      },
      icon: wifiSlashIcon,
    });
  };

  const handleUpdateModal = () => {
    handleModal({
      isShow: true,
      handleClose: () => handleModal({ isShow: false }),
      title: "NITO 앱 버전 업데이트 안내",
      content: "안정적인 서비스 사용을 위해 최신 버전으로 업데이트 해주세요",
      btnText: t("update"),
      handleAction: () => {
        handleModal({ isShow: false });
      },
      optionalBtnText: t("cancel"),
      handleOptional: () => {
        handleModal({ isShow: false });
      },
    });
  };

  const setSimpleBottomSheet = () => {
    handleSimpleBottomSheet({
      children: (
        <CustomButton
          variant="outline"
          onClick={() => handleSimpleBottomSheet({ isShow: false })}
          smallSize
        >
          닫기닫기닫기 버튼버튼버튼
        </CustomButton>
      ),
      isShow: true,
      handleClose: () => handleSimpleBottomSheet({ isShow: false }),
    });
  };

  const BottomSheetWithInput = () => {
    const [value, setValue] = useState(""); // 로컬 상태로 관리

    return (
      <CustomInput
        size="large"
        variant="outline"
        value={value}
        placeholder="복사한 링크를 붙여넣으세요"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          inputRef.current = e.target.value;
        }}
        className="border border-ELSE-D9 bg-white rounded-sm font-normal"
      />
    );
  };
  const setOneButtonBottomSheet = () => {
    handleBottomSheet({
      children: <BottomSheetWithInput />,
      isShow: true,
      hasDelBtn: true,
      handleClose: () => handleBottomSheet({ isShow: false }),
      title: "링크로 상품 추가",
      btnText: t("check"),
      handleAction: () => {
        setIsWished(!isWished);
        if (inputRef.current) {
          handleBottomSheet({ isShow: false });
        }
      },
    });
  };

  const setTwoButtonBottomSheet = () => {
    handleBottomSheet({
      children: (
        <div className="text-lg text-ELSE-55">
          다양한 이벤트와 혜택에 대한 정보를 받아보세요!
        </div>
      ),
      isShow: true,
      handleClose: () => handleBottomSheet({ isShow: false }),
      title: "놓치지마세요!",
      btnText: t("yesPlease"),
      handleAction: () => {
        setIsWished(!isWished);
        handleBottomSheet({ isShow: false });
      },
      optionalBtnText: t("no"),
      handleOptional: () => handleBottomSheet({ isShow: false }),
    });
  };

  return (
    <>
      <div className="flex mb-5">
        <button
          onClick={handleNetworkModal}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-cyan-700 flex-1 mr-2"
          type="button"
        >
          네트워크 모달
        </button>
        <button
          onClick={handleUpdateModal}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-cyan-700 flex-1"
          type="button"
        >
          업데이트 모달
        </button>
      </div>
      <div className="flex mb-5">
        <button
          onClick={setSimpleBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500 mr-2"
          type="button"
        >
          simple bottom sheet
        </button>
        <button
          onClick={setOneButtonBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500 mr-2"
          type="button"
        >
          one button bottom sheet
        </button>
        <button
          onClick={setTwoButtonBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500"
          type="button"
        >
          two button bottom sheet
        </button>
      </div>
      <Modal />
      <SimpleBottomSheet />
      <BottomSheet />
      {isWished && (
        <Toast
          open={isWished}
          onChange={setIsWished}
          message={
            inputRef.current ? "찜하기 추가되었습니다" : "링크를 입력해주세요"
          }
        />
      )}
    </>
  );
};

export default TestButton;
