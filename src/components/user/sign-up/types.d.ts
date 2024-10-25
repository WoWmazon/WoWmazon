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

type NicknameFieldProps = {
  isAvailableNickname: boolean;
  setIsAvailableNickname: Dispatch<SetStateAction<boolean>>;
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

type NicknameValidationType = {
  message: string;
  isError: boolean;
};

type HandleDoubleCheckNicknameProps = {
  nickname: string;
  setValidation: Dispatch<SetStateAction<NicknameValidationType>>;
  setIsAvailableNickname: Dispatch<SetStateAction<boolean>>;
  t: TFunction<string, undefined>;
};
