type PageProps = {
  params: {
    locale: LocaleTypes;
  };
};

type RegisterBodyType = {
  lang: string;
  nickname: string;
  checkAge: boolean;
  checkService: boolean;
  checkMarketing: boolean;
  deviceInfo: DeviceType;
};
