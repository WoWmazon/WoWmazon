import Image from "next/image";

import HeaderArrow from "@/assets/icons/header_arrow.svg";
import CustomInput from "../common/custom-input";
import CustomButton from "../common/custom-button";

const SearchHeader = () => {
  return (
    <div className="grid grid-cols-[32px_auto_32px] items-center h-[62px] py-2 gap-[6px]">
      <Image src={HeaderArrow} alt="left-arrow" width={32} />
      <CustomInput
        variant="filled"
        size="small"
        placeholder="상품명 검색"
        hasDelBtn
      />
      <CustomButton className="w-7 ml-[6px]" variant="none" smallSize>
        검색
      </CustomButton>
    </div>
  );
};

export default SearchHeader;
