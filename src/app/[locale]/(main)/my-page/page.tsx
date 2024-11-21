import MyPageHeader from "@/components/my-page/my-page-header";
import MyPageInfo from "@/components/my-page/my-page-info";
import MyPageNotificationSetting from "@/components/my-page/my-page-notification-setting";
import MyPageWithdrawal from "@/components/my-page/my-page-withdrawal";

const page = async () => {
  return (
    <>
      <MyPageHeader />
      <MyPageInfo />
      <MyPageNotificationSetting />
      <MyPageWithdrawal />
    </>
  );
};
export default page;
