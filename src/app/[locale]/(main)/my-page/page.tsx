import MyPageHeader from "@/components/my-page/my-page-header";
import MyPageInfo from "@/components/my-page/my-page-info";
import MyPageNotificationSetting from "@/components/my-page/my-page-notification-setting";
import MyPageWithdrawal from "@/components/my-page/my-page-withdrawal";

// dummy data
const data = {
  id: 670,
  nickname: "QuickRobin8270",
  lang: "ko",
  social: null,
  pushNotification: {
    isAlarm: true,
    isNightAlarm: false,
    pricePercent: 3,
  },
  agreement: {
    isMarketing: true,
  },
  hasUnreadNoti: false,
};

const page = () => {
  return (
    <>
      <MyPageHeader />
      <MyPageInfo data={data} />
      <MyPageNotificationSetting />
      <MyPageWithdrawal />
    </>
  );
};
export default page;
