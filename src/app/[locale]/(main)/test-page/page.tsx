import CustomButton from "@/components/common/custom-button";
import TestButton from "@/components/test-button";
import TestComponents from "@/components/test/test-components";
import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";

export default async function Home({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "common");

  return (
    <div className="test-container relative h-full">
      <div className="p-4">
        {/* 다국어 처리 테스트 */}
        <h1>{t("greeting")}</h1>
        <h3>{t("description")}</h3>
        {/* modal button */}
        <TestButton />
        <br />
        {/* custom button */}
        <div className="flex flex-col gap-2">
          <CustomButton variant="disabled">disabled button</CustomButton>
          <CustomButton variant="filled">filled button</CustomButton>
          <CustomButton smallSize variant="outline">
            outline button
          </CustomButton>
          <CustomButton smallSize variant="outlineColor">
            filled button
          </CustomButton>
        </div>
        <br />
        <div className="grid grid-cols-[250px_auto] gap-1">
          <input
            placeholder="닉네임을 입력해주세요"
            className="border border-bg-black h-14 px-4 py-[14px] bg-SYSTEM-white"
          />
          <CustomButton size="large" variant="outlineColor">
            중복확인
          </CustomButton>
        </div>
        <TestComponents />
      </div>
    </div>
  );
}
