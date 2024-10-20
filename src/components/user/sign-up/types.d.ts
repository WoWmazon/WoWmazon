type CheckItemProps = {
  required: boolean;
  name: string;
  description: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
  message: InputMessageType;
  nicknameAvailable: boolean;
  onClickCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type CheckFieldsProps = {
  register: UseFormRegister<FormInput>;
  isCheckAll: boolean;
  onChangeCheckAll: React.ChangeEventHandler<HTMLInputElement>;
  onChangeChecks: React.ChangeEventHandler<HTMLInputElement>;
};
