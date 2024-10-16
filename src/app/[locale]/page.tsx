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
      <h1>{t("greeting")}</h1>
      <h3>{t("description")}</h3>
      <TestButton />
    </div>
  );
}
