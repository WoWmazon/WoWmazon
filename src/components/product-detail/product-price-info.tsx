import { getProductPriceInfo } from "@/api/product/apis";
import { format } from "date-fns";
import { getExchangeLatest } from "@/api/exchange/apis";
import { convertToKrw } from "@/utils/exchange";

const ProductPriceInfo = async ({ productId }: { productId: string }) => {
  const dateFormat = (date: string) => format(new Date(date), "yyyy/MM/dd");
  const productInfo = await getProductPriceInfo(productId);
  const exchangeData = await getExchangeLatest();

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
            <p className="text-sm text-ELSE-55">
              {convertToKrw(
                Number(exchangeData?.usdToKrw),
                productInfo.presentPrice
              )}
            </p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            {`역대 최저가(${dateFormat(productInfo.lowPriceUpdatedAt)})`}
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.lowPrice}`}</p>
            <p className="text-sm text-ELSE-55">
              {convertToKrw(
                Number(exchangeData?.usdToKrw),
                productInfo.lowPrice
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <div className="text-sm text-ELSE-76 mb-[14px]">평균가</div>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.averagePrice}`}</p>
            <p className="text-sm text-ELSE-55">
              {convertToKrw(
                Number(exchangeData?.usdToKrw),
                productInfo.averagePrice
              )}
            </p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            {`역대 최고가(${dateFormat(productInfo.highPriceUpdatedAt)})`}
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">{`$${productInfo.highPrice}`}</p>
            <p className="text-sm text-ELSE-55">
              {convertToKrw(
                Number(exchangeData?.usdToKrw),
                productInfo.highPrice
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPriceInfo;
