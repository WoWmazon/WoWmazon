import { TFunction } from "i18next";

export const inputMessageInit = {
  info: "",
  error: "",
};

export const nicknameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9]{6,16}$/;

export const checkFields = ["checkAge", "checkService", "checkMarketing"];

export const checkFieldsItem = (t: TFunction<string, undefined>) => [
  {
    required: true,
    name: "checkAge",
    description: t("sign-up.check1.description"),
  },
  {
    required: true,
    name: "checkService",
    description: t("sign-up.check2.description"),
    link: "",
    children: t("sign-up.check2.sub-description"),
  },
  {
    required: false,
    name: "checkMarketing",
    description: t("sign-up.check3.description"),
    link: "",
  },
];
