"use client";
import { getExchangeLatest } from "@/api/exchange/apis";
import Badge from "../common/badge";
import { useEffect, useState } from "react";

const ExchangeBadge = () => {
  const [exchangeRate, setExchangeRate] = useState<string>("");
  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const data = await getExchangeLatest();
        console.log(data, "exchange"); // 데이터 확인
        setExchangeRate(data.usdToKrw);
      } catch (err) {
        console.error("환율 데이터 로드 중 오류:", err);
      }
    };

    fetchExchangeData(); // 비동기 함수 호출
  }, []);
  return (
    <div className="bg-ELSE-FF3 text-SYSTEM-black w-[375px] h-16 px-4 py-3  grid grid-cols-[auto,1fr] gap-4 items-center">
      <Badge
        text="안내"
        backgroundColor="bg-SYSTEM-main"
        height="h-[18px]"
        textColor="text-SYSTEM-white"
        textSize="text-sm"
        hasIcon={false}
      />
      <p>USD/KRW = {exchangeRate}</p>
    </div>
  );
};
export default ExchangeBadge;
