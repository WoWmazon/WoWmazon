import amazonIcon from "@/assets/icons/amazon_icon.svg";
import linkIcon from "@/assets/icons/link-icon.svg";
import Image from "next/image";
const BottomSheetAddProducts = () => {
  return (
    <div className="w-full h-[125px] bg-red-500 flex flex-col gap-5 justify-center">
      <div className="flex gap-2 cursor-pointer bg-green-600">
        <Image src={amazonIcon} width={32} height={32} alt="amazon-icon" />
        <p className="font-bold text-lg">Amazon에서 상품 추가</p>
      </div>
      <div className="flex gap-2 cursor-pointer">
        <div className="bg-yellow-300 flex gap-2">
          <Image src={linkIcon} width={32} height={32} alt="amazon-icon" />
        </div>
        <div className="bg-green-300 flex flex-col items-start">
          <p className="font-bold text-lg">링크로 상품 추가</p>
          <p className="text-sm text-ELSE-F8">
            현재는 Amazon 상품 링크만 사용 가능해요!
          </p>
        </div>
      </div>
    </div>
  );
};
export default BottomSheetAddProducts;
