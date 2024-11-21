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

//수정필요
export const useSearchParamsStore = create<SearchParamsState>()((set) => ({
  searchParams: { search: "", ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));

export const useProductParamsStore = create<ProductParamsState>()((set) => ({
  searchParams: { search: "", ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));
