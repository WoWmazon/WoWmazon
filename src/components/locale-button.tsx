"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, LocaleTypes } from "../utils/localization/settings"; // 언어 목록과 기본 언어 설정
import { useTranslation } from "@/utils/localization/client";

const LocaleButton = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로에서 언어 코드를 제거하고 새 언어로 전환
  const changeLanguage = (newLocale: string) => {
    const pathSegments = pathname.split("/");

    // 첫 번째 세그먼트가 언어 코드일 경우 제거
    const currentLocale = pathSegments[1] as LocaleTypes;
    const isValidLocale = locales.includes(currentLocale);

    const newPathname = isValidLocale
      ? pathSegments.slice(2).join("/") // 언어 코드 제거
      : pathname; // 언어 코드가 없으면 그대로 사용

    // 새 언어 코드와 함께 경로 변경
    router.push(`/${newLocale}/${newPathname}`);
  };

  return (
    <div>
      <button
        className="border bg-red-300 w-[100px] "
        onClick={() => changeLanguage("en")}
      >
        {t("english")}
      </button>
      <button
        className="border bg-gray-400 w-[100px]"
        onClick={() => changeLanguage("ko")}
      >
        {t("korean")}
      </button>
    </div>
  );
};

export default LocaleButton;
