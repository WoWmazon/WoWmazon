"use client";

import { useState } from "react";
import CustomButton from "@/components/common/custom-button";

const ChooseLaguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(
    null
  );

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex flex-col gap-1 mt-10">
        <p className="font-bold text-[26px] leading-[38px] text-SYSTEM-black">
          편리한 서비스 이용을 위해 <br />
          언어를 선택해주세요.
        </p>
        <p className="text-xl leading-[29px] text-ELSE-55">
          Please select your language to use the service.
        </p>
      </div>
      <div className="w-full py-5 mt-auto z-10">
        <CustomButton
          variant={selectedLanguage ? "filled" : "disabled"}
          disabled={selectedLanguage === null}
        >
          확인
        </CustomButton>
      </div>
      <div className="absolute flex flex-col gap-3 size-full my-auto justify-center">
        <CustomButton
          variant={selectedLanguage === "kr" ? "outlineColor" : "outline"}
          onClick={() => setSelectedLanguage("kr")}
        >
          Korean(KR)
        </CustomButton>
        <CustomButton
          variant={selectedLanguage === "en" ? "outlineColor" : "outline"}
          onClick={() => setSelectedLanguage("en")}
        >
          English(US)
        </CustomButton>
      </div>
    </div>
  );
};

export default ChooseLaguage;
