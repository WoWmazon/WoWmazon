type CheckProps = {
  required: boolean;
  name: string;
  description: string;
  link?: string;
  children?: string;
  register?: UseFormRegister<FormInput>;
};

type FormInput = {
  nickname: string;
  checkAge: boolean;
  checkService: boolean;
  checkMarketing: boolean;
};

type LanguageType = "kr" | "en";

type InputMessageType = {
  info: string;
  error: string;
};

type NicknameFieldProps = Omit<
  ControllerRenderProps<FormInput, "nickname">,
  "onChange"
> & {
  message: any;
  nicknameAvailable: boolean;
  onClickCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
