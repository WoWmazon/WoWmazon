"use server";
import ExchangeBadge from "./exchage-badge";

const ProductListHeader = ({
  exchangeRate,
}: {
  exchangeRate: GetExchangeRateResponse;
}) => {

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="text-xl font-bold w-[375px] h-[62px] text-center">
          상품 리스트
        </div>
      </div>
      <ExchangeBadge exchangeRate={exchangeRate} />
    </>
  );
};

export default ProductListHeader;
