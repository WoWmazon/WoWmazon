import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentSearch: [],
      addRecentSearch: (search) => {
        const currentSearches = get().recentSearch;
        set({
          recentSearch: [
            search,
            ...currentSearches.filter((item) => item !== search),
          ],
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

export const useSearchParamsStore = create<SearchParamsState>()((set) => ({
  searchParams: { search: "", ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));
