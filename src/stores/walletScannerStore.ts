import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WalletBalance {
  address: string;
  balance: number;
}

interface WalletScannerState {
  addresses: string;
  balances: WalletBalance[];
  loading: boolean;
  error: string;
  setAddresses: (addresses: string) => void;
  setBalances: (balances: WalletBalance[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const defaultState = {
  addresses: "",
  balances: [],
  loading: false,
  error: "",
};

export const useWalletScannerStore = create<WalletScannerState>()(
  persist(
    (set) => ({
      ...defaultState,
      setAddresses: (addresses) => set({ addresses }),
      setBalances: (balances) => set({ balances }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      reset: () => set({ ...defaultState }),
    }),
    {
      name: "wallet-scanner-wallets",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        addresses: state.addresses,
        balances: state.balances,
      }),
    }
  )
);
