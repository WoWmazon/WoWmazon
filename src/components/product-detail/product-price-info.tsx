"use server";

import { getProductPriceInfo } from "@/api/product/apis";
import { format } from "date-fns";

const ProductPriceInfo = async () => {
  const dateFormat = (date: string) => format(new Date(date), "yyyy/MM/dd");
  const productInfo = await getProductPriceInfo("127184");

  if (!productInfo) return null;

  return (
    <div className="px-4 py-5 bg-SYSTEM-white">
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA border-b-2 border-ELSE-EC">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">{`현재가(${dateFormat(
            productInfo.presentPriceUpdatedAt
          )})`}</p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.presentPrice}`}</p>
            <p className="text-sm text-ELSE-55">106만 8,530.36원</p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            {`역대 최저가(${dateFormat(productInfo.lowPriceUpdatedAt)})`}
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.lowPrice}`}</p>
            <p className="text-sm text-ELSE-55">97만 5,226.40원</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <div className="text-sm text-ELSE-76 mb-[14px]">평균가</div>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.averagePrice}`}</p>
            <p className="text-sm text-ELSE-55">104만 972원</p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            {`역대 최고가(${dateFormat(productInfo.highPriceUpdatedAt)})`}
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.highPrice}`}</p>
            <p className="text-sm text-ELSE-55">109만 5,924.36 원</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPriceInfo;
