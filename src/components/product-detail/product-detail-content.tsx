"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowUp from "@/assets/icons/badge_arrow_up.svg";
import CustomButton from "../common/custom-button";
import { getProductDatail } from "@/api/product/apis";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const ProductDetailContent = () => {
  const [product, setProduct] = useState<GetProductDatailResponse>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDatail("127184");
        setProduct(data);
      } catch (error) {
        console.log("에러 : ", error);
      }
    };
    fetchProduct();
  }, []);

  console.log("product ---> ", product);

  if (!product) return null;

  return (
    <div className="bg-SYSTEM-white">
      {product.image ? (
        <Image
          src={product.image}
          alt="product-image"
          width={375}
          height={295}
        />
      ) : (
        <div className="bg-ELSE-EC h-[295px] w-[375px] content-center justify-items-center">
          <Image src={noImage} alt="no-image" />
        </div>
      )}
      <div className="p-4 border border-ELSE-EC">
        <p className="mb-3">{product?.title}</p>
        <div className="flex gap-1.5 mb-1">
          <Badge
            text="역대최저가"
            height="h-[18px]"
            hasIcon={false}
            backgroundColor="bg-ELSE-F0"
            textColor="text-ELSE-C1"
            textSize="text-sm"
            iconWidth={12}
          />
          <Badge
            text="17%"
            height="h-[18px]"
            hasIcon={true}
            iconSrc={arrowUp}
            backgroundColor="bg-ELSE-F0"
            textColor="text-ELSE-C1"
            textSize="text-sm"
            iconWidth={12}
          />
        </div>
        <div className="flex gap-2 text-ELSE-F8">
          <p>List Price</p>
          <p className="line-through">{`$ ${product.price}`}</p>
        </div>
        <div className="flex gap-2 content-center">
          <p className="text-xxl font-bold">{`\$ ${product.presentPrice}`}</p>
          <p className="content-center text-ELSE-55">97만 5,226.40원</p>
        </div>
        <p className="text-sm text-ELSE-76 mb-3">
          USD/KRW = 1366.2, 24/10/05 오전 09시15분 기준 UTC+9
        </p>
        <div className="text-md px-3 py-2 bg-ELSE-F5 mb-3">
          <p className="font-bold">아마존 가격</p>
          <p className="text-ELSE-55">
            {`마지막 업데이트 : 
            ${formatDistanceToNow(product.presentPriceUpdatedAt, {
              addSuffix: true,
              locale: ko,
            })}
            , 마지막 가격 변경: 1일 전`}
          </p>
        </div>
        <CustomButton variant="outlineColor">
          더 많은 옵션 보러가기
        </CustomButton>
      </div>
    </div>
  );
};
export default ProductDetailContent;
