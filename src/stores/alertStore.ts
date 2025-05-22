import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AlertType = "price_hit" | "price_change";

export interface PriceAlert {
  id: string;
  type: AlertType;
  price?: number;
  percentage?: number;
  timeframe?: number; // in minutes
  isActive: boolean;
  createdAt: number;
}

interface AlertState {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, "id" | "createdAt">) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
  updateAlert: (id: string, alert: Partial<PriceAlert>) => void;
}

export const useAlertStore = create<AlertState>()(
  persist(
    (set) => ({
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: Date.now(),
            },
          ],
        })),
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      toggleAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
          ),
        })),
      updateAlert: (id, updatedAlert) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, ...updatedAlert } : alert
          ),
        })),
    }),
    {
      name: "price-alerts",
    }
  )
);
