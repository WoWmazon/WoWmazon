export const createRegisterBody = ({
  nickname,
  checkAge,
  checkService,
  checkMarketing,
  lang,
  deviceInfo,
}: RegisterBodyType) => ({
  lang,
  isAlarm: true,
  nickname,
  agreement: {
    isOverAge14: checkAge,
    isServiceAccept: checkService,
    isInfoAccept: checkService,
    isMarketing: checkMarketing,
  },
  device: deviceInfo,
});
