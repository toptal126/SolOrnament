import { create } from "zustand";

interface PriceAlert {
  id: string;
  type: "above" | "below" | "percent";
  value: number;
  triggered: boolean;
  createdAt: number;
}

interface PriceState {
  currentPrice: number | null;
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, "id" | "triggered" | "createdAt">) => void;
  removeAlert: (id: string) => void;
  checkAlerts: (price: number) => void;
}

const ALERTS_STORAGE_KEY = "sol_price_alerts";

function saveAlertsToStorage(alerts: PriceAlert[]) {
  localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
}

function loadAlertsFromStorage(): PriceAlert[] {
  try {
    const data = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export const usePriceStore = create<PriceState>((set, get) => ({
  currentPrice: null,
  alerts: loadAlertsFromStorage(),
  addAlert: (alert) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      triggered: false,
      createdAt: Date.now(),
    };
    set((state) => {
      const updated = [...state.alerts, newAlert];
      saveAlertsToStorage(updated);
      return { alerts: updated };
    });
  },
  removeAlert: (id) => {
    set((state) => {
      const updated = state.alerts.filter((alert) => alert.id !== id);
      saveAlertsToStorage(updated);
      return { alerts: updated };
    });
  },
  checkAlerts: (price) => {
    const { alerts } = get();
    let updated = false;
    alerts.forEach((alert) => {
      if (alert.triggered) return;

      let shouldTrigger = false;
      if (alert.type === "above" && price > alert.value) {
        shouldTrigger = true;
      } else if (alert.type === "below" && price < alert.value) {
        shouldTrigger = true;
      } else if (alert.type === "percent") {
        const priceChange =
          ((price - (get().currentPrice || price)) /
            (get().currentPrice || price)) *
          100;
        if (Math.abs(priceChange) >= alert.value) {
          shouldTrigger = true;
        }
      }

      if (shouldTrigger) {
        // Show notification
        if (Notification.permission === "granted") {
          new Notification("SOL Price Alert", {
            body: `SOL price has ${
              alert.type === "above"
                ? "risen above"
                : alert.type === "below"
                ? "fallen below"
                : "changed by"
            } ${alert.value}${alert.type === "percent" ? "%" : " USD"}`,
            icon: "/solana-logo.png",
          });
        }

        // Update alert state
        set((state) => {
          const updatedAlerts = state.alerts.map((a) =>
            a.id === alert.id ? { ...a, triggered: true } : a
          );
          saveAlertsToStorage(updatedAlerts);
          return { alerts: updatedAlerts };
        });
        updated = true;
      }
    });
    // If any alert was triggered, alerts are already saved in set above
    if (!updated) saveAlertsToStorage(alerts);
  },
}));
