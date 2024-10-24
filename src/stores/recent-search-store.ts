import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the state and actions for the store
type RecentSearchState = {
  recentSearch: string[];
  addRecentSearch: (search: string) => void;
  deleteRecentSearch: (search: string) => void;
  clearRecentSearch: () => void;
};

// Create the store with types applied
export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentSearch: [], // Default empty array
      addRecentSearch: (search) => {
        const currentSearches = get().recentSearch;
        if (currentSearches.includes(search)) return;
        set({
          recentSearch: [search, ...currentSearches], // Add new search item
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
      name: "recent-search", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
