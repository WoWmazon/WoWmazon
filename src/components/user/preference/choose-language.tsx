"use client";

import CustomButton from "@/components/common/custom-button";

const ChooseLaguage = ({ locale, onClickLangButton }: ChooseLanguageProps) => {
  return (
    <div className="relative flex flex-col h-full gap-5">
      <div className="flex flex-col gap-1 mt-10">
        <p className="font-bold text-xxl leading-[38px] text-SYSTEM-black">
          편리한 서비스 이용을 위해 <br />
          언어를 선택해주세요.
        </p>
        <p className="text-xl leading-[29px] text-ELSE-55">
          Please select your language to use the service.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 h-1/2">
        <CustomButton
          variant={locale === "ko" ? "outlineColor" : "outline"}
          onClick={() => onClickLangButton("ko")}
        >
          Korean(KR)
        </CustomButton>
        <CustomButton
          variant={locale === "en" ? "outlineColor" : "outline"}
          onClick={() => onClickLangButton("en")}
        >
          English(US)
        </CustomButton>
      </div>
    </div>
  );
};

export default ChooseLaguage;
