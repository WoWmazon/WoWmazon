import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RecentSearchState = {
  recentSearch: string[];
  addRecentSearch: (search: string) => void;
  deleteRecentSearch: (search: string) => void;
  clearRecentSearch: () => void;
};

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
