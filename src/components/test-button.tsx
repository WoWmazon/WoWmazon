"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { LocaleTypes } from "../utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import Modal from "./common/modal";
import wifiSlashIcon from "../../src/assets/icons/wifiSlash.svg";

const TestButton = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [networkIsOpen, setNetworkIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);

  const toggleNetworkModal = () => {
    setNetworkIsOpen(!networkIsOpen);
  };

  const toggleUpdateModal = () => {
    setUpdateIsOpen(!updateIsOpen);
  };

  const closeModal = () => {
    setUpdateIsOpen(false);
  };

  const modalAction = () => {
    setNetworkIsOpen(false);
    setUpdateIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={toggleNetworkModal}
        className="rounded-lg text-sm px-5 py-2.5 block text-white bg-blue-700 mb-2"
        type="button"
      >
        네트워크 모달
      </button>
      <button
        onClick={toggleUpdateModal}
        className="rounded-lg text-sm px-5 py-2.5 block text-white bg-blue-700 mb-3"
        type="button"
      >
        업데이트 모달
      </button>
      <button
        onClick={toggleUpdateModal}
        className="rounded-lg text-sm px-5 py-2.5 block text-white bg-lime-500"
        type="button"
      >
        bottom sheet
      </button>
      {networkIsOpen && (
        <Modal
          show={networkIsOpen}
          title="네트워크 연결상태가 불안정해요"
          content="네트워크 연결상태를 확인하거나 아래 버튼 클릭후 다시 접속을 시도해주시기 바랍니다"
          btnText={t("retry")}
          handleAction={modalAction}
          icon={wifiSlashIcon}
        />
      )}
      {updateIsOpen && (
        <Modal
          show={updateIsOpen}
          title="NITO 앱 버전 업데이트 안내"
          content="안정적인 서비스 사용을 위해 최신 버전으로 업데이트 해주세요"
          btnText={t("update")}
          handleAction={modalAction}
          optionalBtnText={t("cancel")}
          handleOptional={closeModal}
        />
      )}
    </div>
  );
};

export default TestButton;
