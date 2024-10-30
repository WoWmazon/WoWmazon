import { format } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * ISO 날짜를 "yy/MM/dd 오전/오후 hh시 mm분 기준 UTC+9" 형식으로 변환하는 함수
 */
export const formatToKoreanTime = (isoString: string): string => {
  const date = new Date(isoString);

  const koreanOffsetDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return format(koreanOffsetDate, "yy/MM/dd a hh시mm분 '기준 UTC+9'", {
    locale: ko,
  });
};

/**
 * 환율과 시간을 포맷팅하는 함수
 */
export const getFormattedExchangeText = (
  usdToKrw: string,
  createdAt: string
) => {
  return `USD/KRW = ${usdToKrw}, ${formatToKoreanTime(createdAt)}`;
};
