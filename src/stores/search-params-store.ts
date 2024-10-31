import { create } from "zustand";

type SearchParamsState = {
  searchParams: SearchParamsType;
  setSearchParams: (key: string, value: string) => void;
};

export const useSearchParamsStore = create<SearchParamsState>()((set) => ({
  searchParams: { search: "", ordering: "-discount_rate" },
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));
