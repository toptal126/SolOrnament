import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MainLayoutState {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

export const useMainLayoutStore = create<MainLayoutState>()(
  persist(
    (set) => ({
      selectedTool: "wallet",
      setSelectedTool: (tool) => set({ selectedTool: tool }),
    }),
    {
      name: "wallet-scanner-main-layout",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedTool: state.selectedTool }),
    }
  )
);
