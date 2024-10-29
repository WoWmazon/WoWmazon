import CustomButton from "../common/custom-button";

const MyPageWithdrawal = () => {
  return (
    <>
      <div className="h-2 bg-ELSE-FA" />
      <div className="p-4">
        <CustomButton
          className="size-fit text-md text-ELSE-AE ml-auto"
          variant="none"
          smallSize
        >
          회원탈퇴
        </CustomButton>
      </div>
    </>
  );
};
export default MyPageWithdrawal;
