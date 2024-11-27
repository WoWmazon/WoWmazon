"use client";

import { format } from "date-fns";
import { useToastStore } from "@/stores/common/stores";
import CustomToggle from "../common/custom-toggle";
import Toast from "../common/toast";
import {
  useMutationAgreement,
  useMutationPushNotification,
} from "@/hooks/useUserQuery";

const MyPageNotificationSetting = ({
  agreement,
  pushNotification,
}: MyPageNotificationSettingProps) => {
  const { handleToast } = useToastStore();

  const { mutate: mutateAgreement } = useMutationAgreement();
  const { mutate: mutatePushNotification } = useMutationPushNotification();

  const handlePushNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: checked ? (
        <>
          <p>주요 서비스 알림 켜서</p>
          <p>가격 할인 알림을 받을 수 있어요!</p>
        </>
      ) : (
        <>
          <p>주요 서비스 알림 해제하여</p>
          <p>가격 할인 알림을 받을 수 없어요!</p>
        </>
      ),
    });
    mutatePushNotification(checked);
  };

  const handleAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const currentDatetime = format(new Date(), "yyyy년 MM월 dd일");
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: checked
        ? `${currentDatetime}, 마케팅정보 수신 동의를 유지해요.`
        : `${currentDatetime}, 마케팅정보 수신 동의를 철회했어요.`,
    });
    mutateAgreement(checked);
  };

  return (
    <>
      <div className="px-4 h-[52px] content-center bg-ELSE-FA">
        <p className="text-ELSE-F8">알림 설정</p>
      </div>
      <div className="p-4 ">
        <div className="flex flex-row justify-between items-center h-[30px]">
          <p>주요 서비스 알림</p>
          <CustomToggle
            checked={pushNotification}
            onChange={handlePushNotification}
          />
        </div>
        <p className="text-md text-ELSE-F8">
          역대 최저가, 평균 대비 하락세, 설정된 n% 도달 시 알림을 받을 수
          있습니다.
        </p>
      </div>
      <div className="p-4 ">
        <div className="flex flex-row justify-between items-center h-[30px]">
          <p>광고성 알림</p>
          <CustomToggle checked={agreement} onChange={handleAgreement} />
        </div>
        <p className="text-md text-ELSE-F8">다양한 이벤트 정보를 받아보세요.</p>
      </div>
      <Toast />
    </>
  );
};

export default MyPageNotificationSetting;
