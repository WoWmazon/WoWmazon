import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import CustomInput from "../common/custom-input";
import CustomButton from "../common/custom-button";
import { useRecentSearchStore } from "@/stores/recent-search-store";

import HeaderArrow from "@/assets/icons/header_arrow.svg";

const SearchHeader = () => {
  const router = useRouter();
  const { register, getValues } = useFormContext();

  const setRecentSearch = useRecentSearchStore(
    (state) => state.addRecentSearch
  );

  const handleClickSearch = (keyword: string) => {
    if (keyword) {
      setRecentSearch(keyword);
    }
  };

  return (
    <div className="fixed grid grid-cols-[32px_auto_32px] top-0 items-center w-full max-w-[343px] h-[62px] py-2 gap-[6px] bg-SYSTEM-white">
      <Image
        src={HeaderArrow}
        className="cursor-pointer rounded-md hover:bg-ELSE-F5"
        alt="left-arrow"
        width={32}
        onClick={() => router.back()}
      />
      <CustomInput
        variant="filled"
        size="small"
        placeholder="상품명 검색"
        hasDelBtn
        autoComplete="off"
        {...register("search")}
      />
      <CustomButton
        className="w-7 ml-[6px]"
        variant="none"
        smallSize
        onClick={() => handleClickSearch(getValues("search"))}
      >
        검색
      </CustomButton>
    </div>
  );
};

export default SearchHeader;
