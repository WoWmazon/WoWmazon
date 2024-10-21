"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AllowAuthorization from "./allow-authorization";
import ChooseLaguage from "./choose-language";
import { LocaleTypes } from "@/utils/localization/settings";
import CustomButton from "@/components/common/custom-button";
import { useTranslation } from "@/utils/localization/client";
import { isNull } from "@/utils/type-guard";

const PreferenceContainer = () => {
  const [currentStep, setCurrentStep] = useState<StepType>("language");
  const [selectedLanguage, setSelectedLanguage] = useState<LocaleTypes | null>(
    null
  );

  const { locale }: { locale: LocaleTypes } = useParams();
  const { t } = useTranslation(locale, "user");

  const router = useRouter();

  const HandleClickCheckButton = () => {
    if (currentStep === "authorization") {
      router.push(`/${selectedLanguage}/auth/sign-up`);
    }
    if (isNull(selectedLanguage)) {
      return;
    }
    if (currentStep === "language") {
      setCurrentStep("authorization");
    }
  };

  return (
    <div className="flex flex-col size-full">
      {currentStep === "language" ? (
        <ChooseLaguage
          locale={selectedLanguage}
          onClickLangButton={(lang: LocaleTypes) => {
            setSelectedLanguage(lang);
          }}
        />
      ) : (
        <AllowAuthorization />
      )}
      <div className="w-full py-5">
        <CustomButton
          variant={isNull(selectedLanguage) ? "disabled" : "filled"}
          disabled={isNull(selectedLanguage)}
          onClick={HandleClickCheckButton}
        >
          {t("check")}
        </CustomButton>
      </div>
    </div>
  );
};
export default PreferenceContainer;
