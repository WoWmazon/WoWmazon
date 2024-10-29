import MyPageHeader from "@/components/my-page/my-page-header";
import MyPageInfo from "@/components/my-page/my-page-info";

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
    <div className="px-4">
      <MyPageHeader />
      <MyPageInfo data={data} />
    </div>
  );
};
export default page;
