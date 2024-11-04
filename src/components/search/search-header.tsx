import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomInput from "../common/custom-input";
import CustomButton from "../common/custom-button";
import {
  useRecentSearchStore,
  useSearchFlagStore,
  useSearchParamsStore,
} from "@/stores/search/stores";

import HeaderArrow from "@/assets/icons/header_arrow.svg";

const SearchHeader = () => {
  const router = useRouter();

  const setRecentSearch = useRecentSearchStore(
    (state) => state.addRecentSearch
  );
  const { searchParams, setSearchParams } = useSearchParamsStore();
  const setSearchFlag = useSearchFlagStore((state) => state.setSearchFlag);

  const handleSearchSubmit = () => {
    if (searchParams.search === "") return;
    setRecentSearch(searchParams.search);
    setSearchFlag(true);
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="fixed grid grid-cols-[32px_auto_32px] top-0 items-center w-full max-w-[343px] h-[62px] py-2 gap-1.5 bg-SYSTEM-white">
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
        value={searchParams.search}
        onChange={(e) => setSearchParams("search", e.target.value)}
        onKeyDown={handleInputKeydown}
      />
      <CustomButton
        className="w-7 ml-1.5"
        variant="none"
        smallSize
        onClick={handleSearchSubmit}
      >
        검색
      </CustomButton>
    </div>
  );
};

export default SearchHeader;
