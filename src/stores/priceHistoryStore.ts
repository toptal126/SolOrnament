import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PricePoint {
  timestamp: number;
  price: number;
}

interface PriceHistoryState {
  priceHistory: PricePoint[];
  addPricePoint: (point: PricePoint) => void;
  clearHistory: () => void;
}

export const usePriceHistoryStore = create<PriceHistoryState>()(
  persist(
    (set, get) => ({
      priceHistory: [],
      addPricePoint: (point) =>
        set({ priceHistory: [...get().priceHistory, point] }),
      clearHistory: () => set({ priceHistory: [] }),
    }),
    {
      name: "wallet-scanner-price-history",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ priceHistory: state.priceHistory }),
    }
  )
);
