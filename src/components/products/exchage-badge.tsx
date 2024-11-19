"use server";

import { getExchangeLatest } from "@/api/exchange/apis";
import Badge from "../common/badge";
import { getFormattedExchangeText } from "@/utils/exchange";

const ExchangeBadge = async () => {
  const exchangeData = await getExchangeLatest();

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
      <p className="text-md">
        {exchangeData &&
          getFormattedExchangeText(
            exchangeData.usdToKrw,
            exchangeData.createdAt
          )}
      </p>
    </div>
  );
};
export default ExchangeBadge;
