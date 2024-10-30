import CustomToggle from "../common/custom-toggle";

const MyPageNotificationSetting = () => {
  return (
    <>
      <div className="px-4 h-[52px] content-center bg-ELSE-FA">
        <p className="text-ELSE-F8">알림 설정</p>
      </div>
      <div className="p-4 ">
        <div className="flex flex-row justify-between items-center h-[30px]">
          <p>주요 서비스 알림</p>
          <CustomToggle />
        </div>
        <p className="text-md text-ELSE-F8">
          역대 최저가, 평균 대비 하락세, 설정된 n% 도달 시 알림을 받을 수
          있습니다.
        </p>
      </div>
      <div className="p-4 ">
        <div className="flex flex-row justify-between items-center h-[30px]">
          <p>광고성 알림</p>
          <CustomToggle />
        </div>
        <p className="text-md text-ELSE-F8">다양한 이벤트 정보를 받아보세요.</p>
      </div>
    </>
  );
};
export default MyPageNotificationSetting;
