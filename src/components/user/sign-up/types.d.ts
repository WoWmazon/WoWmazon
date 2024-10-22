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
  onClickCheck: (nickname: string) => void;
};

type CheckFieldsProps = {
  register: UseFormRegister<FormInput>;
  isCheckAll: boolean;
  onChangeCheckAll: React.ChangeEventHandler<HTMLInputElement>;
  onChangeChecks: React.ChangeEventHandler<HTMLInputElement>;
};

type DeviceType = {
  os: "android" | "ios";
  uid: string;
  token: string;
};

type UserRegisterType = {
  lang: LocaleTypes;
  isAlarm: boolean;
  nickname: string;
  agreement: {
    isOverAge14: boolean;
    isServiceAccept: boolean;
    isInfoAccept: boolean;
    isMarketing: boolean;
  };
  device: DeviceType;
};

type HandleDoubleCheckNicknameProps = {
  nickname: string;
  setInputMessage: Dispatch<SetStateAction<InputMessageType>>;
  setIsAvailableNickname: Dispatch<SetStateAction<boolean>>;
  t: TFunction<string, undefined>;
};
