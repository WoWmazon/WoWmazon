"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { LocaleTypes } from "../utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import Modal from "./common/modal";
import wifiSlashIcon from "../../src/assets/icons/wifiSlash.svg";
import { BottomSheet } from "./common/bottom-sheet";
import { SimpleBottomSheet } from "./common/simple-bottom-sheet";
import CustomInput from "./common/custom-input";
import CustomButton from "./common/custom-button";

const TestButton = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [networkIsOpen, setNetworkIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [simpleBottomSheetIsOpen, setSimpleBottomSheetIsOpen] = useState(false);
  const [oneBtnBottomSheetIsOpen, setOneBtnBottomSheetIsOpen] = useState(false);
  const [twoBtnBottomSheetIsOpen, setTwoBtnBottomSheetIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const toggleNetworkModal = () => {
    setNetworkIsOpen(!networkIsOpen);
  };

  const toggleUpdateModal = () => {
    setUpdateIsOpen(!updateIsOpen);
  };

  const toggleSimpleBottomSheet = () => {
    setSimpleBottomSheetIsOpen(!updateIsOpen);
  };

  const toggleOneBtnBottomSheet = () => {
    setOneBtnBottomSheetIsOpen(!updateIsOpen);
  };

  const toggleTwoBtnBottomSheet = () => {
    setTwoBtnBottomSheetIsOpen(!updateIsOpen);
  };

  const closeModal = () => {
    setUpdateIsOpen(false);
  };

  const modalAction = () => {
    setNetworkIsOpen(false);
    setUpdateIsOpen(false);
  };

  const bottomSheetAction = () => {
    setOneBtnBottomSheetIsOpen(false);
    setTwoBtnBottomSheetIsOpen(false);
  };

  const closeBottomSheet = () => {
    setOneBtnBottomSheetIsOpen(false);
    setTwoBtnBottomSheetIsOpen(false);
  };

  const handleAction = () => {
    setSimpleBottomSheetIsOpen(false);
  };

  return (
    <>
      <div className="flex mb-5">
        <button
          onClick={toggleNetworkModal}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-blue-700 flex-1 mr-2"
          type="button"
        >
          네트워크 모달
        </button>
        <button
          onClick={toggleUpdateModal}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-blue-700 flex-1"
          type="button"
        >
          업데이트 모달
        </button>
      </div>
      <div className="flex mb-5">
        <button
          onClick={toggleSimpleBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500 mr-2"
          type="button"
        >
          simple bottom sheet
        </button>
        <button
          onClick={toggleOneBtnBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500 mr-2"
          type="button"
        >
          one button bottom sheet
        </button>
        <button
          onClick={toggleTwoBtnBottomSheet}
          className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500"
          type="button"
        >
          two button bottom sheet
        </button>
      </div>
      {networkIsOpen && (
        <Modal
          isShow={networkIsOpen}
          handleClose={() => setNetworkIsOpen(false)}
          title="네트워크 연결상태가 불안정해요"
          content="네트워크 연결상태를 확인하거나 아래 버튼 클릭후 다시 접속을 시도해주시기 바랍니다"
          btnText={t("retry")}
          handleAction={modalAction}
          icon={wifiSlashIcon}
        />
      )}
      {updateIsOpen && (
        <Modal
          isShow={updateIsOpen}
          handleClose={() => setUpdateIsOpen(false)}
          title="NITO 앱 버전 업데이트 안내"
          content="안정적인 서비스 사용을 위해 최신 버전으로 업데이트 해주세요"
          btnText={t("update")}
          handleAction={modalAction}
          optionalBtnText={t("cancel")}
          handleOptional={closeModal}
        />
      )}
      {simpleBottomSheetIsOpen && (
        <SimpleBottomSheet
          isShow={simpleBottomSheetIsOpen}
          handleClose={() => setSimpleBottomSheetIsOpen(false)}
        >
          {
            <CustomButton variant="outline" onClick={handleAction} smallSize>
              닫기닫기닫기 버튼버튼버튼
            </CustomButton>
          }
        </SimpleBottomSheet>
      )}
      {oneBtnBottomSheetIsOpen && (
        <BottomSheet
          isShow={oneBtnBottomSheetIsOpen}
          handleClose={() => setOneBtnBottomSheetIsOpen(false)}
          title="링크로 상품 추가"
          btnText={t("check")}
          handleAction={bottomSheetAction}
          hasDelBtn
        >
          <CustomInput
            size="large"
            variant="outline"
            value={value}
            placeholder="복사한 링크를 붙여넣으세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            className="border border-ELSE-D9 bg-white rounded-sm font-normal"
          />
        </BottomSheet>
      )}
      {twoBtnBottomSheetIsOpen && (
        <BottomSheet
          isShow={twoBtnBottomSheetIsOpen}
          handleClose={() => setTwoBtnBottomSheetIsOpen(false)}
          title="놓치지마세요!"
          btnText={t("yesPlease")}
          handleAction={bottomSheetAction}
          optionalBtnText={t("no")}
          handleOptional={closeBottomSheet}
        >
          {
            <>
              <div className="text-lg text-ELSE-55">
                다양한 이벤트와 혜택에 대한 정보를 받아보세요!
              </div>
            </>
          }
        </BottomSheet>
      )}
    </>
  );
};

export default TestButton;
