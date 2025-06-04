import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

export interface SettingsState {
  theme: Theme;
  priceUpdateInterval: number;
  customRpcUrl: string;
  setTheme: (theme: Theme) => void;
  setPriceUpdateInterval: (interval: number) => void;
  setCustomRpcUrl: (url: string) => void;
  resetSettings: () => void;
  importSettings: (settings: Partial<SettingsState>) => void;
}

const defaultSettings = {
  theme: "system" as Theme,
  priceUpdateInterval: 20000,
  customRpcUrl: "",
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,
      setTheme: (theme) => set({ theme }),
      setPriceUpdateInterval: (interval) =>
        set({ priceUpdateInterval: interval }),
      setCustomRpcUrl: (url) => set({ customRpcUrl: url }),
      resetSettings: () => set({ ...defaultSettings }),
      importSettings: (settings) => set({ ...get(), ...settings }),
    }),
    {
      name: "solornament-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        priceUpdateInterval: state.priceUpdateInterval,
        customRpcUrl: state.customRpcUrl,
      }),
    }
  )
);
