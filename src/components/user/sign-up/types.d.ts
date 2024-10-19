type CheckProps = {
  required: boolean;
  name: string;
  content: string;
  link?: string;
  children?: {
    content: string;
  };
  register?: UseFormRegister<FormInput>;
};

type FormInput = {
  nickName: string;
  checkAge: boolean;
  checkService: boolean;
  checkMarketing: boolean;
};

type LanguageType = "kr" | "en";
