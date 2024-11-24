"use client";

import MyPageHeader from "@/components/my-page/my-page-header";
import MyPageInfo from "@/components/my-page/my-page-info";
import MyPageNotificationSetting from "@/components/my-page/my-page-notification-setting";
import MyPageWithdrawal from "@/components/my-page/my-page-withdrawal";
import { useQueryUserInfo } from "@/hooks/useUserQuery";

const MyPageContainer = () => {
  const { data } = useQueryUserInfo();
  return (
    <>
      <MyPageHeader />
      <MyPageInfo nickname={data?.nickname ?? ""} />
      <MyPageNotificationSetting
        agreement={data?.agreement.isMarketing ?? false}
        pushNotification={data?.pushNotification.isAlarm ?? false}
      />
      <MyPageWithdrawal />
    </>
  );
};
export default MyPageContainer;
