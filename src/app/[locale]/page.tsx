import CustomButton from "@/components/common/custom-button";
import TestButton from "../../components/test-button";
import { createTranslation } from "../../utils/localization/server";
import { LocaleTypes } from "../../utils/localization/settings";

export default async function Home({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "common");

  return (
    <div className="test-container">
      {/* 다국어 처리 테스트 */}
      <h1>{t("greeting")}</h1>
      <h3>{t("description")}</h3>
      {/* modal button */}
      <TestButton />
      {/* custom button */}
      <div className="flex flex-col gap-2">
        <CustomButton size="large" variant="disabled">
          disabled button
        </CustomButton>
        <CustomButton size="large" variant="filled">
          filled button
        </CustomButton>
        <CustomButton size="small" variant="outline">
          outline button
        </CustomButton>
        <CustomButton size="small" variant="outlineColor">
          filled button
        </CustomButton>
      </div>
      <div className="grid grid-cols-[250px_auto] gap-1">
        {/* 첫번째열 250px 고정너비 가지고 두번째열은 남는 공간 차지 */}
        <input
          placeholder="닉네임을 입력해주세요"
          className="border border-bg-black h-14 px-4 py-[14px] bg-SYSTEM-white"
        />
        <CustomButton size="large" variant="outlineColor">
          중복확인
        </CustomButton>
      </div>
    </div>
  );
}
