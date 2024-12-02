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

export const useWishEditStore = create<WishEditState>()((set, get) => ({
  editList: [],
  isEditing: false,
  setIsEditing: (flag: boolean) => set({ isEditing: flag }),
  isChecked: (id: number) => get().editList.includes(id),
  setEdit: (id: number) =>
    set((state) => ({ editList: [...state.editList, id] })),
  deleteEdit: (id: number) =>
    set((state) => ({
      editList: [...state.editList.filter((item) => item !== id)],
    })),
  clearEditList: () => set({ editList: [] }),
}));
