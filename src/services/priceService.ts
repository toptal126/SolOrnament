import { usePriceStore } from "@stores/priceStore";
import { usePriceHistoryStore } from "@stores/priceHistoryStore";

export const fetchSolPrice = async (): Promise<number> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await response.json();
    const price = data.solana.usd;

    // Update store and check alerts
    const store = usePriceStore.getState();
    store.checkAlerts(price);
    usePriceStore.setState({ currentPrice: price });

    // Record price history
    try {
      usePriceHistoryStore.getState().addPricePoint({
        timestamp: Date.now(),
        price,
      });
    } catch (e) {
      // ignore
    }

    return price;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    throw error;
  }
};

// Start price polling
let pricePollingInterval: number | null = null;

export const startPricePolling = (intervalMs = 60000) => {
  if (pricePollingInterval) return;

  // Initial fetch
  fetchSolPrice();

  // Set up polling
  pricePollingInterval = window.setInterval(fetchSolPrice, intervalMs);
};

export const stopPricePolling = () => {
  if (pricePollingInterval) {
    clearInterval(pricePollingInterval);
    pricePollingInterval = null;
  }
};
