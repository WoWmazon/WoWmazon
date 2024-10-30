"use client";
import Image from "next/image";
import IconButton from "../common/custom-icon-button";
import addProduct from "@/assets/icons/addProduct.svg";
import Badge from "../common/badge";
import arrowDowm from "@/assets/icons/badge_arrow_down.svg";
import defaultIcon from "@/assets/icons/product_default_img.svg";
import { useRouter } from "next/navigation";

const ProductCard = (productProps: productPostCardProps) => {
  const { image, title, presentPrice, price, discountRate } = productProps;
  const router = useRouter();
  return (
    <div
      className="w-[343px] h-[136px]  py-4 border-b-[1px] border-ELSE-EC cursor-pointer"
      onClick={() => router.push("/product-detail")}
    >
      <div className="flex gap-3">
        {/* 상품이미지 */}
        <div className="w-20 h-20 flex justify-center items-center bg-ELSE-EC">
          <Image
            src={image || defaultIcon}
            alt="Image"
            width={66}
            height={47}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
        {/* 이미지 제외 컴포넌트 */}
        <div className=" flex flex-col gap-5">
          {/* 상품명과 아이콘버튼 */}
          <div className=" w-[251px] h-10 gap-4 flex">
            <p className="w-[203px] h-10  text-md text-ELSE-55 line-clamp-2">
              {title}
            </p>
            <IconButton icon={addProduct} size={32} alt="add-icon" />
          </div>
          <div>
            {/* 뱃지랑 최저가 */}
            <div className="flex justify-between">
              <Badge
                text="역대최저가"
                height="h-[18px]"
                hasIcon={false}
                backgroundColor="bg-ELSE-F0"
                textColor="text-ELSE-C1"
                textSize="text-sm"
                iconWidth={12}
              />
              <p className="tabular-nums text-md font-bold">$ {price}</p>
            </div>
            {/* 현재 가격이랑 뱃지 */}
            <div className="flex justify-end gap-[6px]">
              <p className="text-md text-ELSE-76">{presentPrice} 원</p>
              <Badge
                text={discountRate}
                height="h-[18px]"
                hasIcon={true}
                iconSrc={arrowDowm}
                backgroundColor="bg-ELSE-FF3"
                textColor="text-SYSTEM-main"
                textSize="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
