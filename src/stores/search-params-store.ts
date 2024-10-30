import { create } from "zustand";

// Define the state and actions for the store
type SearchParamsState = {
  searchParams: SearchParamsType;
  setSearchParams: (key: string, value: string) => void;
};

// Create the store with types applied
export const useSearchParamsStore = create<SearchParamsState>()((set, get) => ({
  searchParams: { search: "" }, // Default empty array
  setSearchParams: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
}));
