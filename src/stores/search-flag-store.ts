import { create } from "zustand";

type SearchFlagState = {
  searchFlag: boolean;
  setSearchFlag: (flag: boolean) => void;
};

export const useSearchFlagStore = create<SearchFlagState>()((set) => ({
  searchFlag: false,
  setSearchFlag: (flag) => set(() => ({ searchFlag: flag })),
}));
