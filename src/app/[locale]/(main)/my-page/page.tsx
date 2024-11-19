import { getUserInfo } from "@/api/user/apis";
import MyPageHeader from "@/components/my-page/my-page-header";
import MyPageInfo from "@/components/my-page/my-page-info";
import MyPageNotificationSetting from "@/components/my-page/my-page-notification-setting";
import MyPageWithdrawal from "@/components/my-page/my-page-withdrawal";

const page = async () => {
  const data = await getUserInfo();
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
