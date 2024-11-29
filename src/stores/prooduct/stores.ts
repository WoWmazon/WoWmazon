import { getExchangeLatest } from "@/api/exchange/apis";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRecentKeywordsStore = create<RecentKeywordsState>()(
  persist(
    (set, get) => ({
      recentKeyword: [],
      add: (keyword) => {
        const currentSearches = get().recentKeyword;
        set({
          recentKeyword: [
            keyword,
            ...currentSearches.filter((item) => item !== keyword),
          ],
        });
      },
      delete: (keyword) => {
        const currentKeywords = get().recentKeyword;
        set({
          recentKeyword: currentKeywords.filter((item) => item !== keyword),
        });
      },
      clear: () => {
        set({
          recentKeyword: [],
        });
      },
    }),
    {
      name: "recent-keywords",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useProductParamsStore = create<ProductParamsState>()((set) => ({
  searchParams: { ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));

export const useWishListParamStore = create<WishProductParamsState>()(
  (set) => ({
    favoriteParams: { ordering: "product_priority" },
    setFavoriteParams: (key, value) =>
      set((state) => ({
        favoriteParams: { ...state.favoriteParams, [key]: value },
      })),
  })
);

export const useExchangeRateStore = create<ExchangeRateState>()((set) => {
  const fetchExchangeRate = async () => {
    try {
      const data = await getExchangeLatest(); // API 호출
      set({ exchangeRate: data }); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
    }
  };

  // 초기 상태 설정
  const initialState = {
    exchangeRate: {
      usdToKrw: 1350, // 기본 환율 값
      createdAt: new Date("2024-11-28T10:42:54.451916+09:00"), // 기본 시간
    },
    fetchExchangeRate, // 상태 안에 함수 추가
  };

  // 비동기 함수 호출 및 주기적 갱신 설정
  fetchExchangeRate();
  setInterval(() => {
    fetchExchangeRate(); // 주기적으로 호출
  }, 30 * 60 * 1000); // 30분

  return initialState; // 초기 상태 반환
});
