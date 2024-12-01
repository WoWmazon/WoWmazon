import { format } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * ISO 날짜를 "yy/MM/dd 오전/오후 hh시 mm분 기준 UTC+9" 형식으로 변환하는 함수
 */
export const formatToKoreanTime = (isoString: string): string => {
  const date = new Date(isoString);

  const koreanOffsetDate = new Date(date.getTime());

  return format(koreanOffsetDate, "yy/MM/dd a hh시mm분 '기준 UTC+9'", {
    locale: ko,
  });
};

/**
 * 환율과 시간을 포맷팅하는 함수
 */
export const getFormattedExchangeText = (
  usdToKrw: number,
  createdAt: string
) => {
  return `USD/KRW = ${usdToKrw}, ${formatToKoreanTime(createdAt)}`;
};

/**
 * 환율에 따라 한화로 가격 계산해주는 함수
 */
export const convertToKrw = (usdToKrw: number, usdAmount: number) => {
  const krwAmount = usdToKrw * usdAmount;
  return `${krwAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`; // 소수점 둘째 자리까지 반올림
};
