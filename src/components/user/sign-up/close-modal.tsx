"use client";

import Modal from "@/components/common/modal";
import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";
import { useParams, useRouter } from "next/navigation";

const CloseModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { locale }: { locale: LocaleTypes } = useParams();
  const { t } = useTranslation(locale, "user");
  const router = useRouter();

  return (
    isOpen && (
      <Modal
        isShow={isOpen}
        handleClose={() => setIsOpen(false)}
        title={t("modal.title")}
        content={t("modal.content")}
        btnText={t("modal.button1")}
        handleAction={() => setIsOpen(false)}
        optionalBtnText={t("modal.button2")}
        handleOptional={() => router.push("/")}
      />
    )
  );
};
export default CloseModal;
