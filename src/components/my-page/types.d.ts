type UserInfoType = {
  id: number;
  nickname: string;
  lang: string;
  social: null;
  pushNotification: {
    isAlarm: boolean;
    isNightAlarm: boolean;
    pricePercent: number;
  };
  agreement: {
    isMarketing: boolean;
  };
  hasUnreadNoti: boolean;
};
