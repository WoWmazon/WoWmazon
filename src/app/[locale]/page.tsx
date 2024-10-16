import CustomButton from "@/components/common/custom-button";
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
      <h1>{t("greeting")}</h1>
      <h3>{t("description")}</h3>
      <div className="flex flex-col gap-2">
        <CustomButton height="large" variant="disabled" fontWeight="bold">
          disabled button
        </CustomButton>
        <CustomButton height="large" variant="filled" fontWeight="bold">
          filled button
        </CustomButton>
        <CustomButton height="large" variant="outline" fontWeight="bold">
          outline button
        </CustomButton>
        <CustomButton height="large" variant="outlineColor" fontWeight="bold">
          filled button
        </CustomButton>
      </div>
      <div className="grid grid-cols-[250px_auto] gap-1">
        {/* 첫번째열 250px 고정너비 가지고 두번째열은 남는 공간 차지 */}
        <input
          placeholder="닉네임을 입력해주세요"
          className="border border-bg-black h-14 px-4 py-[14px] bg-SYSTEM-white"
        />
        <CustomButton height="large" variant="outlineColor" fontWeight="bold">
          중복확인
        </CustomButton>
      </div>
    </div>
  );
}
