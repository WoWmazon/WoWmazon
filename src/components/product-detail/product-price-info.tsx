"use client";

// API : 상품 상세 가격 조회 GET _ /v1/product/{id}/price_info/ 

const ProductPriceInfo = async () => {
  return (
    <div className="px-4 py-5 bg-SYSTEM-white">
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA border-b-2 border-ELSE-EC">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">현재가(2024/05/08)</p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">$780.12</p>
            <p className="text-sm text-ELSE-55">106만 8,530.36원</p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            역대 최저가(2023/05/11)
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">$712.00</p>
            <p className="text-sm text-ELSE-55">97만 5,226.40원</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">평균가</p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">$760.00</p>
            <p className="text-sm text-ELSE-55">104만 972원</p>
          </div>
        </div>
        <div className="pl-3">
          <p className="text-sm text-ELSE-76 mb-[14px]">
            역대 최고가(2024/05/12)
          </p>
          <div className="text-right">
            <p className="font-bold text-ELSE-33">$800.12</p>
            <p className="text-sm text-ELSE-55">109만 5,924.36 원</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPriceInfo;
