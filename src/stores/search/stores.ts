import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentSearch: [],
      addRecentSearch: (search) => {
        const currentSearches = get().recentSearch;
        if (currentSearches.includes(search)) return;
        set({
          recentSearch: [search, ...currentSearches],
        });
      },
      deleteRecentSearch: (search) => {
        const currentSearches = get().recentSearch;
        set({
          recentSearch: currentSearches.filter((keyword) => keyword !== search),
        });
      },
      clearRecentSearch: () => {
        set({
          recentSearch: [],
        });
      },
    }),
    {
      name: "recent-search",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useSearchFlagStore = create<SearchFlagState>()((set) => ({
  searchFlag: false,
  setSearchFlag: (flag) => set(() => ({ searchFlag: flag })),
}));

export const useSearchParamsStore = create<SearchParamsState>()((set) => ({
  searchParams: { search: "", ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));