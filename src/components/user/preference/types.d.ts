type StepType = "language" | "authorization";

type ChooseLanguageProps = {
  locale: LocaleTypes | null;
  onClickLangButton: (lang: LocaleTypes) => void;
};
