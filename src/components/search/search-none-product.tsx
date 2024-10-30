import Image from "next/image";

import NoneProducts from "@/assets/icons/detail_noProduct.svg";

const SearchNoneProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[408px]">
      <Image src={NoneProducts} alt="none-product" width={80} />
      <p className="text-ELSE-55">검색 결과가 없어요!</p>
    </div>
  );
};
export default SearchNoneProduct;
