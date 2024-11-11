import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomInput from "../common/custom-input";
import CustomButton from "../common/custom-button";
import {
  useRecentSearchStore,
  useSearchParamsStore,
} from "@/stores/search/stores";

import HeaderArrow from "@/assets/icons/header_arrow.svg";
import { useEffect, useState } from "react";

const SearchHeader = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  const setRecentSearch = useRecentSearchStore(
    (state) => state.addRecentSearch
  );
  const {
    searchParams: { search },
    setSearchParams,
  } = useSearchParamsStore((state) => state);

  const handleSearchSubmit = () => {
    if (inputValue === "") return;
    setRecentSearch(inputValue);
    setSearchParams("search", inputValue);
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSearchParams("search", "");
    }
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search, setInputValue]);

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
        value={inputValue}
        onChange={handleInputChange}
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
